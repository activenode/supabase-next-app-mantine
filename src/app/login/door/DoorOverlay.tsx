"use client";
import { useSupabase } from "@/components/SupabaseProvider";
import { LoadingOverlay } from "@mantine/core";

export const LoginDoor = () => {
  return (
    <LoadingOverlay
      visible
      loaderProps={{
        size: "xl",
      }}
      sx={{
        backdropFilter: "blur(8px)",
      }}
    />
  );
};
