import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { fishId, auctionId } = req.query;

    if (
      !fishId ||
      typeof fishId !== 'string' ||
      !auctionId ||
      typeof auctionId !== 'string'
    ) {
      return res.status(400).json({ error: 'Invalid fishId or auctionId' });
    }

    try {
      const { data, error } = await supabase
        .from('bids')
        .select('*')
        .eq('fish_id', fishId)
        .eq('auction_id', auctionId)
        .order('bid_amount', { ascending: false });

      if (error) {
        throw error;
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching bids:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
