import { createRLSServerClient } from "@/utils/server-only/supabase-server";
import { redirect } from "next/navigation";
import { LoginWrapper } from "./LoginWrapper";

export const metadata = {
  title: "Login",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supa = createRLSServerClient();
  const user = await supa.auth.getUser();

  if (user.data.user) {
    redirect(process.env.NEXT_PUBLIC_AFTER_LOGIN_PATH!);
  }

  return <LoginWrapper>{children}</LoginWrapper>;
}
