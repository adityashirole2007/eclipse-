import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avkhryumvpuvwvjozepa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2a2hyeXVtdnB1dnd2am96ZXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODAxMjAsImV4cCI6MjA4NTE1NjEyMH0.GwoTyECgJvdsJdchbkvpijSqceFVPbETCMYqgKF-Iv0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);