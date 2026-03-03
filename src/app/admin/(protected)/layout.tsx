import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "../admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/admin/403");
  }

  return (
    <div className="min-h-screen" style={{ background: "#05050b" }}>
      <AdminNav userEmail={user.email ?? ""} />
      <main className="container mx-auto px-4 sm:px-6 py-10">{children}</main>
    </div>
  );
}
