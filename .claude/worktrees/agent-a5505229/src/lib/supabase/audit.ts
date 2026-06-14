import { createAdminClient } from "./server";

/**
 * Writes an entry to the audit_log table.
 * Call from Server Actions / Route Handlers after admin mutations.
 */
export async function logAudit(
  adminId: string,
  action: string,
  meta?: Record<string, unknown>
) {
  try {
    const supabase = await createAdminClient();
    await supabase.from("audit_log").insert({
      admin_id: adminId,
      action,
      meta: meta ?? null,
    });
  } catch (_e) {
    // Audit logging failure should never surface to the user
    console.error("[audit] failed to write log:", action, _e);
  }
}
