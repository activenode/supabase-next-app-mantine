import "server-only";
import { PageLayout } from "../components/base/PageLayout";
import RootStyleRegistry from "./emotion";

import { createRLSServerClient } from "../utils/server-only/supabase-server";
import { ReactNode } from "react";
import SupabaseProvider from "@/components/SupabaseProvider";
import SupabaseListener from "@/components/SupabaseListener";

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createRLSServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <head />
      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />

          <RootStyleRegistry>{children}</RootStyleRegistry>
        </SupabaseProvider>
      </body>
    </html>
  );
}
