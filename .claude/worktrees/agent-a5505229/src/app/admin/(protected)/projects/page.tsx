import { createClient } from "@/lib/supabase/server";
import { ProjectsClient } from "./projects-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Projects",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return <ProjectsClient initialProjects={projects ?? []} />;
}
