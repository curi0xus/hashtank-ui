import { createSupabaseClient } from '@/util/supabase/server';
const supabase = createSupabaseClient();

export const fetchMetrics = async (start: Date, end: Date) => {
  const formattedStart = start.toISOString();
  const formattedEnd = end.toISOString();

  // Total Users
  const { count: totalUsers } = await supabase
    .from('users')
    .select('*', { count: 'exact' })
    .gte('created_at', formattedStart)
    .lte('created_at', formattedEnd);

  // Claimed SHELL Tokens
  const { count: claimedShellTokens } = await supabase
    .from('claims')
    .select('*', { count: 'exact' })
    .gte('created_at', formattedStart)
    .lte('created_at', formattedEnd);

  // Sauced Fish
  const { count: saucedFish } = await supabase
    .from('sauce_registry')
    .select('*', { count: 'exact' })
    .gte('created_at', formattedStart)
    .lte('created_at', formattedEnd);

  // Fetch Distinct Sauce States and Count Manually
  const { data: sauceStatesData, error: sauceStatesError } = await supabase
    .from('sauces')
    .select('state');

  if (sauceStatesError) {
    console.error('Error fetching sauce states:', sauceStatesError);
  }

  // Manually count each distinct state
  const sauceStates = sauceStatesData?.reduce((acc, { state }) => {
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const claimedSauce = 0

  return {
    totalUsers: totalUsers || 0,
    claimedShellTokens: claimedShellTokens || 0,
    saucedFish: saucedFish || 0,
    claimedSauce,
    sauceStates,
  };
};
