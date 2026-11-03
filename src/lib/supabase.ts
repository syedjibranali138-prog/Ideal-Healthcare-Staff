import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isPlaceholderValue = (val?: string): boolean => {
  if (!val) return true;
  const lower = val.toLowerCase().trim();
  return (
    lower.includes("your-project") ||
    lower.includes("your-supabase") ||
    lower.includes("change-to") ||
    lower.includes("generate-a-random") ||
    lower.includes("placeholder") ||
    lower === "https://your-project.supabase.co" ||
    lower === "your-supabase-anon-key" ||
    lower.startsWith("your-supabase-service-role-key")
  );
};

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseUrl.startsWith("http") &&
    !isPlaceholderValue(supabaseUrl) &&
    supabaseAnonKey &&
    supabaseAnonKey.length > 10 &&
    !isPlaceholderValue(supabaseAnonKey)
  );
};

export const isSupabaseAdminConfigured = (): boolean => {
  return Boolean(
    isSupabaseConfigured() &&
    supabaseServiceKey &&
    supabaseServiceKey.length > 10 &&
    !isPlaceholderValue(supabaseServiceKey)
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
