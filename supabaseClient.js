// lib/supabase.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables if running in Node.js
if (typeof window === 'undefined') {
  dotenv.config();
}

// Replace these with your actual Supabase URL and anon/public key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Add error handling for missing environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Remove console.log in production
if (process.env.NODE_ENV !== 'production') {
  console.log('Supabase Client Initialized:', supabase);
}

export default supabase;
