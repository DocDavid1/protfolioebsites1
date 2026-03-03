import { createClient } from "@/lib/supabase/server";
import { SettingsClient } from "./settings-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Settings",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  const { data: rows } = await supabase
    .from("settings")
    .select("key, value");

  const settings: Record<string, string> = {};
  (rows ?? []).forEach((r) => {
    settings[r.key] = r.value;
  });

  return <SettingsClient initialSettings={settings} />;
}
