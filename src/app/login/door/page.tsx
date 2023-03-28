import { createRLSServerClient } from "@/utils/server-only/supabase-server";
import { redirect } from "next/navigation";
import { LoginDoor } from "./DoorOverlay";

export default async function Door() {
  return <LoginDoor />;
}
