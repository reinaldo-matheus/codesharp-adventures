import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Only the URL + publishable/anon key ever belong in a browser app. The anon
// key is safe to ship in the client bundle by design — it's paired with
// Postgres Row Level Security policies on the server, so it can only ever
// read/write rows the signed-in user owns. The secret/service-role key must
// never appear here: it bypasses RLS entirely and would hand full database
// access to anyone who opens devtools.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
