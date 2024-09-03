import { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let totalCount;
  const { count, error: countError } = await supabase
    .from('claims')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Error getting total claims count:', countError);
    return res.status(500).json({ error: countError.message });
  }

  totalCount = count;

  if (req.method === 'GET') {
    return res.status(200).json({ totalClaims: count });
  }
  if (req.method === 'POST') {
    const { address, inviteCode } = req.body;

    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid user address ' });
    }

    try {
      if (totalCount === 100) {
        return res.status(400).json({ error: 'All claimed.' });
      }
      const { data } = await supabase
        .from('claims')
        .select('*')
        .eq('wallet_address', address)
        .limit(1)
        .single();

      console.log('USER CLAIMED?', data);

      if (data) {
        return res.status(400).json({ error: 'User already claimed' });
      } else {
        console.log('INSERTING CLAIMS..');
        const { data: updateClaims, error: updateClaimsError } = await supabase
          .from('claims')
          .insert({
            amount: '100.00',
            wallet_address: address,
            invite_code: inviteCode,
          });

        console.log('INSERTING CLAIMS DONE');

        const { data: updateUserBalance, error: updateUserBalanceError } =
          await supabase
            .from('users')
            .update({ balance: '100.00' })
            .eq('wallet_address', address);

        console.log('UPDATING BALANCE CLAIMS DONE');

        if (updateUserBalance || updateClaimsError) {
          throw updateUserBalance || updateClaimsError;
        }

        console.log('RETURNING');
        return res.status(200).json({ succes: true });
      }
    } catch (error) {
      console.error('Error claiming tokens:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
