import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

// Function to handle the API request
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { auction_id: auctionId, fish_ids: fishIds } = req.body;

      console.log('Received auctionId:', auctionId);
      console.log('Received fishIds:', fishIds);

      if (
        !auctionId ||
        !fishIds ||
        !Array.isArray(fishIds) ||
        !fishIds.length
      ) {
        return res
          .status(400)
          .json({ error: 'Missing auction ID or fish IDs' });
      }

      const supabase = createSupabaseClient();

      // Assign fish to the auction
      const { data, error } = await supabase.from('auction_fish').upsert(
        fishIds.map((fishId) => ({
          auction_id: auctionId,
          fish_id: fishId,
        }))
      );

      if (error) {
        throw new Error(`Error assigning fish to auction: ${error.message}`);
      }

      return res
        .status(200)
        .json({ success: 'Fish assigned to auction successfully', data });
    } catch (error: any) {
      console.error('Error processing request:', error);
      return res
        .status(500)
        .json({
          error:
            error instanceof Error
              ? error.message
              : 'Failed to process request',
        });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
