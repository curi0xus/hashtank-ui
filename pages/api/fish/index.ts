import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';
import authenticateUserMiddleWare from '@/util/authenticateUserMiddleWare';

const supabase = createSupabaseClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { state } = req.query;

    try {
      const user = await authenticateUserMiddleWare(req, res);
      if (user) {
        const { data: fishData, error: fishError } = await supabase
          .from('fish')
          .select('*')
          .eq('owner_address', user!.wallet!.address)
          .eq('state', state);

        if (fishError) {
          return res.status(500).json({
            error: `Error fetching fish list: ${fishError.message}`,
          });
        }

        return res.status(200).json({
          fish: fishData,
        });
      }
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
