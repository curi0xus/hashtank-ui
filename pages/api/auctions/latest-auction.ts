import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

export function generateRandomString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
}

async function closePreviousAuction(previousAuctionId: string) {
  console.log('CLOSING AUCTION', previousAuctionId);
  const { data: allFishInAuction, error: allFishInAuctionError } =
    await supabase
      .from('fish')
      .select('id, fishtype_id, fishtypes(id, total)')
      .eq('auction_id', previousAuctionId);

  if (allFishInAuctionError) {
    console.error('Error fetching fish in auction', allFishInAuctionError);
    throw allFishInAuctionError;
  }

  if (allFishInAuction?.length && allFishInAuction.length > 0) {
    // run updates concurrently using promise
    await Promise.all(
      allFishInAuction.map(async (fish) => {
        // @ts-ignore
        const upperLimitOfGenePool = fish.fishtypes.total;
        const randFishIndex = Math.floor(Math.random() * upperLimitOfGenePool);

        const { data: allFishBids, error: allFishBidsError } = await supabase
          .from('bids')
          .select('user_id, bid_amount')
          .eq('fish_id', fish.id)
          .eq('auction_id', previousAuctionId)
          .order('bid_amount', { ascending: false });

        if (allFishBidsError) {
          console.error(`Error fetching all fish(${fish.id}) bids  in auction`, allFishBidsError);
          throw allFishBidsError;
        }

        console.log('ALL FISH BIDS:', allFishBids);

        if (allFishBids?.length && allFishBids.length > 0) {
          const winner = allFishBids[0].user_id;
          // @ts-ignore
          const fishTypeId = fish.fishtypes.id;
          const newFilePath = `metadata/${winner}/${fish.id}/metadata.json`;

          const { error: copyDataError } = await supabase.storage
            .from('gene_pool')
            .copy(`${fishTypeId}/${randFishIndex}/metadata.json`, newFilePath);

          if (copyDataError && copyDataError.message !== 'The resource already exists') {
            console.error(`Error copying metadata`, copyDataError);
            throw copyDataError;
          }

          const { error: updateFishError } = await supabase
            .from('fish')
            .update({
              state: 'revealed',
              owner_address: winner,
              winning_bid: allFishBids[0].bid_amount,
              metadata_url: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}${newFilePath}`,
            })
            .eq('id', fish.id);

          if (updateFishError) {
            console.error(`Error updating fish`, updateFishError);
            throw updateFishError;
          }

          console.log('FISH AWARED TO:', winner, newFilePath);
        }
      })
    );
  }
}

async function createNewAuction(batchNumber: number) {
  const NEW_AUCTION_NAME = 'New Auction';
  const NEW_AUCTION_DESCRIPTION = 'This is a new auction';
  const AUCTION_START_PRICE = '1.00';
  const BATCH_PREFIX = generateRandomString(2);

  const newStartTime = new Date();
  const newEndTime = new Date(newStartTime);
  newEndTime.setMinutes(newEndTime.getMinutes() + 5);

  const { data: newAuctionData, error: newAuctionError } = await supabase
    .from('auctions')
    .insert([
      {
        name: NEW_AUCTION_NAME,
        description: NEW_AUCTION_DESCRIPTION,
        start_time: newStartTime.toISOString(),
        end_time: newEndTime.toISOString(),
        start_price: AUCTION_START_PRICE,
        state: 'open',
        created_at: new Date().toISOString(),
        batch_number: batchNumber,
        batch_prefix: BATCH_PREFIX,
      },
    ])
    .select('*')
    .single();

  if (newAuctionError) {
    console.log(`Error creating new auction: ${newAuctionError.message}`);
    throw new Error(`Error creating new auction: ${newAuctionError.message}`);
  }

  const newAuctionId = newAuctionData.id;

  // Get full list of fisht ypes
  const { data: fishTypesList, error } = await supabase
    .from('fishtypes')
    .select();

  if (fishTypesList?.length && fishTypesList.length > 0 && !error) {
    // Choose randomly between 10 to 20 fish in each auction batch
    const randumNumOfFish = Math.floor(Math.random() * (20 - 10) + 10);

    const newAuctionFishList = Array.from({ length: randumNumOfFish }).map(
      (_, i) => {
        const randFishTypeIndex = Math.floor(Math.random() * fishTypesList.length);
        const fishType = fishTypesList[randFishTypeIndex];
        return {
          fishtype_id: fishType.id,
          auction_id: newAuctionId,
          serial_number: BATCH_PREFIX + '-' + (i + 1),
        };
      }
    );

    const { error: inserFishError } = await supabase
      .from('fish')
      .insert(newAuctionFishList);
    if (inserFishError) {
      throw new Error(`Error fetching fish IDs: ${inserFishError.message}`);
    }

    const { error: updateAuctionTableWithBatchSizeError } = await supabase
      .from('auctions')
      .update({ batch_size: randumNumOfFish })
      .eq('id', newAuctionId);
    if (updateAuctionTableWithBatchSizeError) {
      throw new Error(
        `Error updating auction table with batch size: ${updateAuctionTableWithBatchSizeError.message}`
      );
    }
    return newAuctionId;
  } else {
    throw new Error('No Fish Types Found');
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let newAuctionId: string | null = null;

  if (req.method === 'GET') {
    try {
      // Fetch the latest auction
      const { data: latestAuction, error: latestAuctionError } = await supabase
        .from('auctions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (latestAuctionError) {
        // If auctions table is empty, create new auction for the first time
        if (latestAuctionError.details === 'The result contains 0 rows') {
          try {
            newAuctionId = await createNewAuction(1);
          } catch (error: any) {
            return res.status(500).json({
              error: `Error creating new auction: ${error.message}`,
            });
          }
          return res.status(200).json({ auction_id: newAuctionId });
        } else {
          return res.status(500).json({
            error: `Error fetching latest auction: ${latestAuctionError.message}`,
          });
        }
      }

      const now = new Date();
      const lastAuctionEndTime = new Date(latestAuction.end_time);

      // Check if the last auction is already closed
      if (latestAuction.state === 'closed') {
        console.log('Latest auction is already closed, creating a new one.');
        try {
          newAuctionId = await createNewAuction(latestAuction.batch_number + 1);
        } catch (error: any) {
          return res.status(500).json({
            error: `Error creating new auction: ${error.message}`,
          });
        }
      } else if (now > lastAuctionEndTime) {
        console.log('Auction has ended, closing the previous auction.');
        await closePreviousAuction(latestAuction.id);

        // Update the state of the previous auction to 'closed'
        const { error: updateError } = await supabase
          .from('auctions')
          .update({ state: 'closed' })
          .eq('id', latestAuction.id);

        if (updateError) {
          return res.status(500).json({
            error: `Error updating previous auction state: ${updateError.message}`,
          });
        } else {
          console.log('Previous auction closed successfully.');
        }

        try {
          console.log('Creating a new auction...');
          newAuctionId = await createNewAuction(latestAuction.batch_number + 1);
          console.log('New auction created with ID:', newAuctionId);
        } catch (error: any) {
          console.error('Error creating new auction:', error);
          return res.status(500).json({
            error: `Error creating new auction: ${error.message}`,
          });
        }
      }

      return res
        .status(200)
        .json({ auction_id: newAuctionId || latestAuction.id });
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;