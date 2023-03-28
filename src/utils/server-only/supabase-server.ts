import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export const createRLSServerClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
