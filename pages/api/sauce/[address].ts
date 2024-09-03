import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { address, state } = req.query;

    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid user address  ' });
    }

    try {
      const { data, error } = await supabase
        .from('sauces')
        .select('*')
        .eq('owner_address', address)
        .eq('state', state)
        .order('created_at', { ascending: false });
      if (error) {
        throw error;
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching users sauce:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
