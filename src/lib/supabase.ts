import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/database";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Session persistence is handled manually in useSession via SecureStore
// to avoid Supabase's storage adapter hanging on async reads at startup.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false,
    detectSessionInUrl: false,
  },
});
