import { NextResponse } from "next/server";

import {
  MEMBER_COOKIE_NAME,
  MEMBER_COOKIE_VERSION_NAME,
} from "@/lib/member-auth/session";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const next = requestUrl.searchParams.get("next") || "/";
  const response = NextResponse.redirect(new URL(next, requestUrl.origin));

  response.cookies.set(MEMBER_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(MEMBER_COOKIE_VERSION_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
