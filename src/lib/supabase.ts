import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseUrl.startsWith("http") &&
    supabaseAnonKey &&
    supabaseAnonKey.length > 10
  );
};

export const isSupabaseAdminConfigured = (): boolean => {
  return Boolean(
    isSupabaseConfigured() &&
    supabaseServiceKey &&
    supabaseServiceKey.length > 10
  );
};

// Client for public browser operations
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Server-only client with service role for admin mutations & private bucket access
export const getSupabaseAdmin = () => {
  if (!isSupabaseAdminConfigured()) {
    return null;
  }
  return createClient(supabaseUrl!, supabaseServiceKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
