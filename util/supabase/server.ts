// util/supabase/server.ts

import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // or anon key depending on your use case
  return createClient(supabaseUrl, supabaseKey);
};
