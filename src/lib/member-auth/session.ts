import { createHmac, timingSafeEqual } from "node:crypto";

export const MEMBER_COOKIE_NAME =
  process.env.MEMBER_COOKIE_NAME?.trim() || "member_session";
export const MEMBER_COOKIE_VERSION_NAME =
  process.env.MEMBER_COOKIE_VERSION_NAME?.trim() || "member_version";
export const MEMBER_COOKIE_MAX_AGE_DAYS = Number.parseInt(
  process.env.MEMBER_COOKIE_MAX_AGE_DAYS || "90",
  10
);
const MEMBER_SESSION_SECRET = process.env.MEMBER_SESSION_SECRET?.trim();

function getSessionSecret() {
  if (!MEMBER_SESSION_SECRET) {
    throw new Error("MEMBER_SESSION_SECRET is required for member session cookies.");
  }

  return MEMBER_SESSION_SECRET;
}

export function getMemberCookieMaxAgeSeconds() {
  return Math.max(1, MEMBER_COOKIE_MAX_AGE_DAYS) * 24 * 60 * 60;
}

export function createMemberSessionToken(version: number) {
  const versionString = String(version);
  const signature = createHmac("sha256", getSessionSecret())
    .update(versionString)
    .digest("hex");

  return `${versionString}.${signature}`;
}

export function verifyMemberSessionToken(token: string | undefined, version: number) {
  if (!token) return false;

  const [tokenVersion, signature] = token.split(".");
  const expectedVersion = String(version);

  if (!tokenVersion || !signature || tokenVersion !== expectedVersion) {
    return false;
  }

  const expectedSignature = createHmac("sha256", getSessionSecret())
    .update(expectedVersion)
    .digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
}
