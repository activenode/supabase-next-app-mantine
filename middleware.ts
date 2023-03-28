import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { Database } from "./src/types/supabase";
import { LOGIN_PATH } from "@/utils/paths";
import { getAbsoluteSelfUrl } from "@/utils/getAbsoluteSelfUrl";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { nextUrl } = req;
  const { pathname } = nextUrl;

  if (
    !session &&
    pathname.startsWith(`${process.env.NEXT_PUBLIC_LOGIN_TENANT_PATH!}/`)
  ) {
    const url = getAbsoluteSelfUrl(LOGIN_PATH);

    return NextResponse.redirect(getAbsoluteSelfUrl(LOGIN_PATH));
  } else {
    // console.log(session);
  }

  return res;
}
