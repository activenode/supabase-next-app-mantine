import "server-only";
import { createRLSServerClient } from "@/utils/server-only/supabase-server";
import { Login } from "./login";

// do not cache this page
export const revalidate = 0;

export default async function ServerComponent() {
  // const supa = createClient();
  // const user = supa.auth.getUser();

  // console.log(user);
  return <Login />;
}
