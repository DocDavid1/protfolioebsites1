import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Returns the current Supabase user, or null if not authenticated.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Requires authentication. Redirects to /admin/login if not authenticated.
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

/**
 * Requires admin access (is_admin = true in profiles table).
 * Redirects to /admin/403 if not admin.
 */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/admin/403");
  return user;
}
