import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { address } = req.body;

    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid user address ' });
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', address)
      .limit(1)
      .single();

    if (data) {
      return res.status(400).json({ error: 'User already created' });
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .insert({ wallet_address: address });

      if (error) {
        throw error;
      }

      return res.status(200).json({ user: data });
    } catch (error) {
      console.error('Error creating new user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
