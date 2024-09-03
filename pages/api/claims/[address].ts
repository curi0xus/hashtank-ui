import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { address } = req.query;

    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid user address ' });
    }

    try {
      const { data: userBalanceData, error } = await supabase
        .from('users')
        .select('balance')
        .eq('wallet_address', address)
        .limit(1)
        .single();

      let claims;
      let userBalance = userBalanceData?.balance;

      if (error) {
        console.error('Error user balance data:', error, userBalance);
        if (error && error.details === 'The result contains 0 rows') {
          userBalance = 0;
        } else {
          throw error;
        }
      }

      const { data, error: claimError } = await supabase
        .from('claims')
        .select('*')
        .eq('wallet_address', address)
        .limit(1)
        .single();

      if (claimError) {
        console.error('claimError', claimError, data);
        if (claimError && claimError.details === 'The result contains 0 rows') {
          claims = undefined;
        } else {
          throw error;
        }
      }

      return res
        .status(200)
        .json({ claims: data, userBalance: userBalance || 0 });
    } catch (error) {
      console.error('Error getting user balance from claims:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
