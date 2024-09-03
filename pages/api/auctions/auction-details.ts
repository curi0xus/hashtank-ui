import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from "@/util/supabase/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { auction_id: auctionId } = req.body;

      if (!auctionId) {
        return res.status(400).json({ error: "Missing auction_id" });
      }

      const supabase = createSupabaseClient();

      // Fetch auction details of the requested auction_id
      const { data: auctionData, error: auctionError } = await supabase
        .from('auctions')
        .select('*')
        .eq('id', auctionId)
        .single();

      if (auctionError) {
        return res.status(500).json({ error: `Error fetching auction details: ${auctionError.message}` });
      }

      // Fetch associated fish
      const { data: fishData, error: fishError } = await supabase
        .from('auction_fish')
        .select('fish_id, fish(*)')
        .eq('auction_id', auctionId);

      if (fishError) {
        return res.status(500).json({ error: `Error fetching associated fish: ${fishError.message}` });
      }

      return res.status(200).json({
        auction: auctionData,
        fish: fishData.map((af: any) => af.fish),
      });
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
