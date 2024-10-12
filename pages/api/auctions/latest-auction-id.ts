import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      // Fetch the latest auction that is still open
      const { data: currentAuction, error } = await supabase
        .from('auctions')
        .select('*')
        .eq('state', 'open')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        return res.status(500).json({ error: `Error fetching current auction: ${error.message}` });
      }

      return res.status(200).json({ auction_id: currentAuction.id });
    } catch (error) {
      console.error('Error fetching current auction:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
