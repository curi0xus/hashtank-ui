import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';
import { enqueueBackgroundJob } from '@/util/qstash';

const supabase = createSupabaseClient();

async function triggerCloseAuctionJob(previousAuctionId: string) {
  console.log('triggering close auction job', previousAuctionId);
  try {
    console.log(
      'RESPONSE',
      `${process.env.NEXT_PUBLIC_API_URL}/api/auctions/close-previous-auction`
    );
    const res = await enqueueBackgroundJob(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auctions/close-previous-auction`,
      {
        previousAuctionId,
      }
    );
  } catch (error) {
    console.log('ERROR', error);
    //@ts-ignore
    throw new Error(`Failed to enqueue QStash job: ${error.message}`);
  }
}

async function createNewAuction(batchNumber: number) {
  const NEW_AUCTION_NAME = 'Alpha Charlie Echo';
  const NEW_AUCTION_DESCRIPTION =
    "The first oceanic harvest we have on display here is from the year 2044. The batch you see now was part of a research expedition commissioned by the United Nations in its final months. These marine life forms were the first to exhibit significant mutations surpassing anything previously observed in the ocean. The findings from these UN missions indicate a projected collapse in marine organisms and their habitats within the next few years, accompanied by widespread contamination of those that survive. World governments pressured the UN to withhold these findings from the public, and the collected specimens were stored under the codename ACE.\n Now, in the year 2048, as the wholesale collapse of sea life and disruption of oceanic currents become a reality, widespread famine and the reclamation of coastal settlements by the sea have thrown governments worldwide into disarray. Amidst this chaos, our contacts on the inside have managed to smuggle out these original specimens for your collecting pleasure.\n However, let's keep this a secret between us; we don't want any G-Men knocking on our doors.";

  const AUCTION_START_PRICE = '1.00';
  const BATCH_PREFIX = generateRandomString(2);
  // Create a new auction with the same details
  const newStartTime = new Date();
  const newEndTime = new Date(newStartTime);

  // newEndTime.setDate(newEndTime.getDate() + 1);
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

    let newAuctionFishList = [];
    for (let i = 0; i < randumNumOfFish; i++) {
      // Choose between 0 and the upper limit of the index
      const randFishTypeIndex = Math.floor(
        Math.random() * fishTypesList.length
      );
      const fishType = fishTypesList[randFishTypeIndex];
      newAuctionFishList.push({
        fishtype_id: fishType.id,
        auction_id: newAuctionId,
        serial_number: BATCH_PREFIX + '-' + (i + 1),
      });
    }

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

        // Update the state of the previous auction to 'closed'
        const { error: updateError } = await supabase
          .from('auctions')
          .update({ state: 'closed' })
          .eq('id', latestAuction.id);

        try {
          await triggerCloseAuctionJob(latestAuction.id);
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
            newAuctionId = await createNewAuction(
              latestAuction.batch_number + 1
            );
          } catch (error: any) {
            return res.status(500).json({
              error: `Error creating new auction: ${error.message}`,
            });
          }
        } catch (error: any) {
          return res.status(500).json({
            error: `Error triggering close auction job: ${error.message}`,
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
