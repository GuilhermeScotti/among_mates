import { createClient } from "@supabase/supabase-js";

const URL = "https://qdipviuobjgmhogxexna.supabase.co";

export const supabaseClient = () => {
  return createClient(URL, import.meta.env.VITE_API_KEY);
};
