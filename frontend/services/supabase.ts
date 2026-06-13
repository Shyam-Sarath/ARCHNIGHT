import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zufwhvweywjubyvbeeza.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1ZndodndleXdqdWJ5dmJlZXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNTA4ODQsImV4cCI6MjA5NjkyNjg4NH0.PIZ1m-kTkb1pVdDHARo4rHCN_cF4HPrpDupL0YxMnEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
