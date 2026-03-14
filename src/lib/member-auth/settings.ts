import { createAdminClient } from "@/lib/supabase/admin";

export type SiteSettingsRow = {
  member_password_hash: string | null;
  member_password_version: number;
};

export async function getSiteSettings() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("member_password_hash, member_password_version")
    .limit(1)
    .single<SiteSettingsRow>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
