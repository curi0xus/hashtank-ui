import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  let finalId = id;
  if (finalId === 'undefined') {
    const { data: latestAuction, error: latestAuctionError } = await supabase
      .from('auctions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (latestAuction) {
      finalId = latestAuction.id;
    }
  }

  try {
    const { data: currentAuction } = await supabase
      .from('auctions')
      .select('created_at')
      .eq('id', finalId)
      .limit(1)
      .single();

    const { data, error } = await supabase
      .from('auctions')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .lt('created_at', currentAuction?.created_at);

    const { data: oneAfter } = await supabase
      .from('auctions')
      .select('id')
      .order('created_at', { ascending: true })
      .limit(1)
      .gt('created_at', currentAuction?.created_at);

    return res.status(200).json({
      paginate: {
        after: oneAfter?.[0],
        before: data?.[0],
      },
    });
  } catch (error: any) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
