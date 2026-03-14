export const MEMBER_REDIRECT_PATH = "/members/calendar";
export const ADMIN_REDIRECT_PATH = "/admin/profile";

export function getRedirectPathForRole(role: string | null | undefined) {
  return role === "admin" ? ADMIN_REDIRECT_PATH : MEMBER_REDIRECT_PATH;
}
