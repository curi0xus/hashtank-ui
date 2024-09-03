import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Missing fishtype_id' });
      }

      const supabase = createSupabaseClient();

      // Fetch fish details
      const { data: fishTypeData, error: fishTypeError } = await supabase
        .from('fishtypes')
        .select('*')
        .eq('id', id)
        .single();

      if (fishTypeError) {
        return res.status(500).json({
          error: `Error fetching fish type: ${fishTypeError.message}`,
        });
      }

      return res.status(200).json({
        fishTypeData,
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
