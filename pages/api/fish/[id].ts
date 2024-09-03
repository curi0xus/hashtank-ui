import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';
const supabase = createSupabaseClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query;
    try {
      if (!id) {
        return res.status(400).json({ error: 'Missing fish_id' });
      }

      // Fetch fish details
      const { data: fishData, error: fishError } = await supabase
        .from('fish')
        .select('*')
        .eq('id', id)
        .single();

      if (fishError) {
        return res
          .status(500)
          .json({ error: `Error fetching fish details: ${fishError.message}` });
      }

      return res.status(200).json({
        fish: fishData,
      });
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
