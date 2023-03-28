"use client";

import { useSupabase } from "@/components/SupabaseProvider";
import { Alert, Box, Stack, Title } from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const SettingsClient = ({ host_id }: { host_id: number }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hostData, setHostData] = useState<any>(null);
  const { supabase } = useSupabase();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    supabase
      .from("r_hosts")
      .select("*")
      .then(({ data: host_data }) => {
        setHostData(host_data);
      });
  }, []);

  return (
    <Stack>
      <Title>Hey Settings!</Title>
      <Box>
        You are currently accessing the path with the{" "}
        <strong>host_id = {host_id}</strong>
      </Box>
      <Alert>The fact that you are here means you are logged in</Alert>
      <Box>
        Here is some User Information about this host: <br />
        <pre>{JSON.stringify(hostData, null, 2)}</pre>
      </Box>
      <Box>
        Here is some User Information about yourself: <br />
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Box>
    </Stack>
  );
};
