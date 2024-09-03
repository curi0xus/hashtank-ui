import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing auction_id' });
  }

  try {
    // Fetch auction details of the requested auction_id
    const { data: auctionData, error: auctionError } = await supabase
      .from('auctions')
      .select('*')
      .eq('id', id)
      .single();

    if (auctionError) {
      return res.status(500).json({
        error: `Error fetching auction details: ${auctionError.message}`,
      });
    }

    return res.status(200).json({
      auction: auctionData,
    });
  } catch (error: any) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
