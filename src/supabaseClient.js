import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tsazcyjugcgmvmysqoip.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzYXpjeWp1Z2NnbXZteXNxb2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NDc0MjIsImV4cCI6MjA4NTAyMzQyMn0.HgfKQqaZycQj_zEWTnRG6JiIhtvMQnoI0IFiQ7tIOjk';

// Initialize ONCE and export
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);