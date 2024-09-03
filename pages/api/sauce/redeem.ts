import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';
import { REDEMPTION_FEE } from '@/components/General/Modal/Variants/VanityShelf/RedeemSauceFishCard/RedeemSauceConfirmation/CallToAction';

const supabase = createSupabaseClient();

const GIFT_BOTTLE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_SAUCE_URL}sauce_templates/json/2.json`;
const EMPTY_BOTTLE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_SAUCE_URL}sauce_templates/json/1.json`;
const STANDARD_CHECKOUT_URL = `${process.env.NEXT_PUBLIC_SUPABASE_SAUCE_URL}sauce_templates/json/StandardCheckout.json`;
const PREMIUIM_CHECKOUT_URL = `${process.env.NEXT_PUBLIC_SUPABASE_SAUCE_URL}sauce_templates/json/PremiumCheckout.json`;
const ARTISANAL_CHECKOUT_URL = `${process.env.NEXT_PUBLIC_SUPABASE_SAUCE_URL}sauce_templates/json/ArtisanalCheckout.json`;
//hahwfypnlahgzacxomlw.supabase.co/storage/v1/object/public/sauce/sauce_templates/json/ArtisanalCheckout.json?t=2024-08-23T11%3A54%3A44.883Z
//https://buy.stripe.com/00g00eg4D2zU6mQ7st STANDARD
//https://buy.stripe.com/28obIW2dN8YiaD6fZ0 PREMIUM
//https://buy.stripe.com/28o3cqdWv5M6dPicMP ARTISANAL

// const BOTTLE_LIST = [GIFT_BOTTLE_URL, EMPTY_BOTTLE_URL];
const BOTTLE_LIST = [
  EMPTY_BOTTLE_URL,
  STANDARD_CHECKOUT_URL,
  PREMIUIM_CHECKOUT_URL,
  ARTISANAL_CHECKOUT_URL,
];

const SAUCE_INDEX_MAP = {
  GUNK: 0,
  STANDARD: 1,
  PREMIUM: 2,
  ARTISANAL: 3,
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { sauceId, address } = req.body;

      // Validate request body
      if (!sauceId || sauceId.length === 0) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const { data: sauce } = await supabase
        .from('sauces')
        .select('grade')
        .eq('id', sauceId)
        .limit(1)
        .single();

      // const randNum = Math.round(Math.random());
      // @ts-ignore
      const bottleListIndex = SAUCE_INDEX_MAP[sauce.grade];
      const bottleMetadataUrl = BOTTLE_LIST[bottleListIndex];

      const { error: updateSauceError } = await supabase
        .from('sauces')
        .update({ state: 'REDEEMED' })
        .eq('id', sauceId);

      if (updateSauceError) {
        throw updateSauceError;
      }

      const { error: createDropError } = await supabase.from('drops').insert({
        type: 'BOTTLE',
        metadata_url: bottleMetadataUrl,
        wallet_address: address,
      });

      if (createDropError) {
        throw createDropError;
      }

      const { data: userBalanceData } = await supabase
        .from('users')
        .select('balance')
        .eq('wallet_address', address)
        .limit(1)
        .single();
      if (userBalanceData) {
        const { error: updateBalanceError } = await supabase
          .from('users')
          .update({ balance: userBalanceData.balance - REDEMPTION_FEE })
          .eq('wallet_address', address);

        if (updateBalanceError) {
          console.log(updateBalanceError);
          return res.status(500).json({
            error: `Error updating user balance: ${updateBalanceError.message}`,
          });
        }
        return res.status(200).json({ success: true });
      } else {
        throw new Error('Failed to retrieve user balance');
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
