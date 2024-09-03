import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://qvhwpiyiwkhxllmnctzw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2aHdwaXlpd2toeGxsbW5jdHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzNjA2MDgsImV4cCI6MjAyNjkzNjYwOH0.Cj-A8VFeOMdjxZJ8W7dydQpvQkhQBH0of9312ZmgWcc'
);

export default supabase;
