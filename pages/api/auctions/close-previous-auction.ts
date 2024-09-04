import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

async function closePreviousAuction(req: NextApiRequest, res: NextApiResponse) {
  const { previousAuctionId } = req.body;

  try {
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
      await Promise.all(
        allFishInAuction.map(async (fish) => {
          //@ts-ignore
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

          if (allFishBids?.length && allFishBids.length > 0) {
            const winner = allFishBids[0].user_id;
            //@ts-ignore
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

            console.log('FISH AWARDED TO:', winner, newFilePath);
          }
        })
      );
    }

    res.status(200).json({ message: 'Auction closed successfully' });
  } catch (error) {
    console.error('Error closing auction:', error);
    res.status(500).json({ error: 'Error closing auction' });
  }
}

export default closePreviousAuction;