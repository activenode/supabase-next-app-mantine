import "server-only";

import { PageLayout } from "@/components/base/PageLayout";
import { LayoutHeader } from "@/components/base/LayoutHeader";
import { createRLSServerClient } from "@/utils/server-only/supabase-server";
import { ReactNode } from "react";

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) {
  const supabase = createRLSServerClient();

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  const assignedHostAccess = await supabase
    .from("r_hosts")
    .select("*")
    .eq("id", params.host_id)
    .single();

  if (!assignedHostAccess.data) {
    throw new Error(
      `This user does not have access to host_id=${params.host_id}. 
      Create a host with id=${params.host_id} first (if not existent). 
      Then create user which references your auth.user and that host.`
    );
  }

  return (
    <PageLayout params={params}>
      <LayoutHeader />
      {children}
    </PageLayout>
  );
}
