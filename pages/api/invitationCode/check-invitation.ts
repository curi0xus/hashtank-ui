// pages/api/check-invitation.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase server-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Use service role key for secure server-side operations

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { invitationCode } = req.query;

  if (!invitationCode || typeof invitationCode !== 'string') {
    return res.status(400).json({ error: 'Invalid invitation code' });
  }

  try {
    // Check if the invitation code exists in the Supabase table
    const { data: existingCode, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('invitation_code', invitationCode)
      .single();

    if (error && error.code !== 'PGRST116') {
      return res.status(500).json({ error: 'Error checking invitation code' });
    }

    if (existingCode) {
      return res.status(200).json({ status: 'used' });
    } else {
      // If the code does not exist, insert it
      const { error: insertError } = await supabase
        .from('invitations')
        .insert([{ invitation_code: invitationCode }]);

      if (insertError) {
        return res
          .status(500)
          .json({ error: 'Error inserting invitation code' });
      }

      return res.status(200).json({ status: 'unused' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export default handler;
