import { useSupabase } from "@/components/SupabaseProvider";
import { SignInWithPasswordlessCredentials } from "@supabase/supabase-js";
import { useCallback } from "react";

export const useMagicLogin = (
  options?: SignInWithPasswordlessCredentials["options"]
) => {
  const { supabase } = useSupabase();

  return useCallback(
    (email: string) =>
      supabase.auth
        .signInWithOtp({ email, options })
        .then(({ data, error }) => {
          if (error) {
            throw error;
          }

          return data;
        }),
    [supabase, options]
  );
};
