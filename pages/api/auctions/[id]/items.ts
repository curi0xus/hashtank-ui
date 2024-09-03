import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing auction_id' });
  }

  try {
    // Fetch associated fish
    const { data: fishData, error: fishError } = await supabase
      .from('fish')
      .select(
        'id, state, metadata_url, winning_bid, owner_address, serial_number, fishtypes(*)'
      )
      .eq('auction_id', id);

    if (fishError) {
      console.error('get fish error', fishError.message);
      return res.status(500).json({
        error: `Error fetching associated fish: ${fishError.message}`,
      });
    }

    return res.status(200).json({
      fish: fishData.map((af: any) => ({
        ...af.fishtypes,
        id: af.id,
        state: af.state,
        winning_bid: af.winning_bid,
        owner_address: af.owner_address,
        metadata_url: af.metadata_url,
        serial_number: af.serial_number,
      })),
    });
  } catch (error: any) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
