import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { address, auctionId } = req.query;

    if (
      !address ||
      typeof address !== 'string' ||
      !auctionId ||
      typeof auctionId !== 'string'
    ) {
      return res
        .status(400)
        .json({ error: 'Invalid user address or invalid auction id ' });
    }

    try {
      const { data, error } = await supabase
        .from('bids')
        .select('bid_amount, auction_id, fish(*)')
        .eq('user_id', address)
        .eq('auction_id', auctionId)
        .order('created_at', { ascending: false });
      if (error) {
        throw error;
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching users  bids:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
