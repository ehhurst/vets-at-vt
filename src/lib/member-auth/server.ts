import { cookies } from "next/headers";

import { getSiteSettings } from "@/lib/member-auth/settings";
import {
  MEMBER_COOKIE_NAME,
  MEMBER_COOKIE_VERSION_NAME,
  verifyMemberSessionToken,
} from "@/lib/member-auth/session";

export async function hasActiveMemberSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(MEMBER_COOKIE_NAME)?.value;
  const versionCookie = cookieStore.get(MEMBER_COOKIE_VERSION_NAME)?.value;

  if (!token || !versionCookie) {
    return false;
  }

  try {
    const settings = await getSiteSettings();
    return (
      versionCookie === String(settings.member_password_version) &&
      verifyMemberSessionToken(token, settings.member_password_version)
    );
  } catch {
    return false;
  }
}
