import { useSupabase } from "@/components/SupabaseProvider";
import { useRouter } from "next/navigation";

const afterSignoutPath = process.env.NEXT_PUBLIC_AFTER_SIGNOUT_PATH;

export const useLogout = () => {
  const { supabase } = useSupabase();
  const router = useRouter();

  return async () =>
    await supabase.auth.signOut().then((result) => {
      router.push(afterSignoutPath!);
      return result;
    });
};
