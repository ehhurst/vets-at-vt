import { NextRequest, NextResponse } from "next/server";

const MEMBER_COOKIE_NAME =
  process.env.MEMBER_COOKIE_NAME?.trim() || "member_session";
const MEMBER_COOKIE_VERSION_NAME =
  process.env.MEMBER_COOKIE_VERSION_NAME?.trim() || "member_version";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/members")) {
    return NextResponse.next();
  }

  const memberSession = request.cookies.get(MEMBER_COOKIE_NAME)?.value;
  const memberVersion = request.cookies.get(MEMBER_COOKIE_VERSION_NAME)?.value;
  const hasSupabaseAuthCookie = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-") && cookie.name.includes("auth-token"));

  if ((memberSession && memberVersion) || hasSupabaseAuthCookie) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/member-login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/members/:path*"],
};
