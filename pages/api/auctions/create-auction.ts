import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from "@/util/supabase/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const formData = req.body as { [key: string]: any };

      // Extract and validate fields
      const name = formData.name as string;
      const description = formData.description as string;
      const startTime = formData.start_time as string;
      const endTime = formData.end_time as string;
      const startPrice = Number(formData.start_price);
      const state = formData.state as string;

      if (!name || !description || !startTime || !endTime || isNaN(startPrice) || !state) {
        return res.status(400).json({ error: "Missing or invalid required fields" });
      }

      const supabase = createSupabaseClient();
      const { data, error } = await supabase
        .from('auctions')
        .insert([
          {
            name,
            description,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            start_price: startPrice,
            state,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        throw new Error(`Error creating auction: ${error.message}`);
      }

      return res.status(200).json({ success: "Auction created successfully", data });
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to process request" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
