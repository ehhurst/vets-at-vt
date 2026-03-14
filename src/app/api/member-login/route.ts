import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

import { MEMBER_REDIRECT_PATH } from "@/lib/auth/redirects";
import { getSiteSettings } from "@/lib/member-auth/settings";
import {
  createMemberSessionToken,
  getMemberCookieMaxAgeSeconds,
  MEMBER_COOKIE_NAME,
  MEMBER_COOKIE_VERSION_NAME,
} from "@/lib/member-auth/session";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { password?: string }
    | null;
  const password = body?.password?.trim();

  if (!password) {
    return NextResponse.json({ ok: false, error: "Password is required." }, { status: 400 });
  }

  const settings = await getSiteSettings();

  if (!settings.member_password_hash) {
    return NextResponse.json(
      { ok: false, error: "Member login is not configured yet." },
      { status: 503 }
    );
  }

  const isValidPassword = await compare(password, settings.member_password_hash);
  if (!isValidPassword) {
    return NextResponse.json(
      { ok: false, error: "Incorrect member password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true, redirectTo: MEMBER_REDIRECT_PATH });
  const maxAge = getMemberCookieMaxAgeSeconds();
  const version = settings.member_password_version;

  response.cookies.set(MEMBER_COOKIE_NAME, createMemberSessionToken(version), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  response.cookies.set(MEMBER_COOKIE_VERSION_NAME, String(version), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });

  return response;
}
