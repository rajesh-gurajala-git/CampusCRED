import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') {
    console.error('Supabase URL is missing or invalid. Please check your .env file.');
}

if (!supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
    console.error('Supabase Anon Key is missing or invalid. Please check your .env file.');
}

export const supabase = (supabaseUrl && supabaseUrl !== 'YOUR_SUPABASE_URL')
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
