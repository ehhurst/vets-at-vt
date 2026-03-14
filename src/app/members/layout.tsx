import { redirect } from "next/navigation";

import { getActiveAdminName } from "@/lib/admin-auth/server";
import { hasActiveMemberSession } from "@/lib/member-auth/server";

export default async function MembersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasSession = await hasActiveMemberSession();
  const adminName = await getActiveAdminName();

  if (!hasSession && !adminName) {
    redirect("/member-login");
  }

  return <>{children}</>;
}
