import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { sauceId, address } = req.body;

      // Validate request body
      if (!sauceId || sauceId.length === 0) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const { error: updateSauceError } = await supabase
        .from('sauces')
        .update({ state: 'SOLD' })
        .eq('id', sauceId);

      if (updateSauceError) {
        throw updateSauceError;
      }

      const { data: soldSauce, error: soldSauceError } = await supabase
        .from('sauces')
        .select('buyback_price')
        .eq('id', sauceId)
        .limit(1)
        .single();

      if (soldSauceError) {
        throw soldSauceError;
      }

      const { data: userBalanceData } = await supabase
        .from('users')
        .select('balance')
        .eq('wallet_address', address)
        .limit(1)
        .single();
      console.log('USER BALANCE');
      if (userBalanceData && soldSauce) {
        const { error: updateBalanceError } = await supabase
          .from('users')
          .update({
            balance: userBalanceData.balance + soldSauce.buyback_price,
          })
          .eq('wallet_address', address);

        if (updateBalanceError) {
          console.log(updateBalanceError);
          return res.status(500).json({
            error: `Error updating user balance: ${updateBalanceError.message}`,
          });
        }
        return res.status(200).json({ success: true });
      } else {
        throw new Error('Failed to retrieve user balance or sauce sold.');
      }
    } catch (error) {
      console.error('Error redeeming sauce...:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
