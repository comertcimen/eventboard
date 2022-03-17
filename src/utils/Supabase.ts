import { createClient } from "@supabase/supabase-js";
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from "src/constants";

export const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_KEY,
  {
    autoRefreshToken: true,
    persistSession: true,
  }
);

export const user = supabase.auth.user();
