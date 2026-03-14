import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getActiveAdminName() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, full_name, email")
    .eq("id", user.id)
    .single<{
      role: string;
      full_name: string | null;
      email: string | null;
    }>();

  if (error || profile?.role !== "admin") {
    return null;
  }

  return profile.full_name || profile.email || user.email || "admin";
}
