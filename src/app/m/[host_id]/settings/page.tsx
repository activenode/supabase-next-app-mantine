import { createRLSServerClient } from "@/utils/server-only/supabase-server";
import { TenantPageProps } from "@/types/types";
import { Title } from "@mantine/core";
import { SettingsClient } from "./SettingsClient";

export default async function Units({ params }: TenantPageProps) {
  const supabase = createRLSServerClient();
  const { host_id } = params;

  const { data, error } = await supabase
    .from("r_host_users")
    .select("*")
    .eq("host", params.host_id);

  return (
    <>
      <SettingsClient host_id={host_id} />
    </>
  );
}
