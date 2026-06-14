/**
 * FIGHTERS BUILDERS — Agent Definitions
 *
 * This module is the entry point for all AI agents.
 * Agents are autonomous AI components that handle specific business tasks.
 *
 * Planned Agents:
 * ─────────────────────────────────────────────
 * 1. OnboardingAgent      — Qualifies new leads via WhatsApp
 * 2. AuditAgent           — Analyzes client websites for improvements
 * 3. LeadCaptureAgent     — Captures and enriches lead data
 * 4. CRMSyncAgent         — Syncs conversations to CRM systems
 * 5. ReportingAgent       — Generates weekly performance reports
 *
 * Integration Points:
 * ─────────────────────────────────────────────
 * - WhatsApp Business API (src/lib/integrations/whatsapp.ts)
 * - OpenRouter AI models (via @openrouter/ai-sdk-provider)
 * - Database (via @/lib/db)
 * - CRM webhooks (src/lib/integrations/crm.ts)
 *
 * Usage Example (future):
 * ─────────────────────────────────────────────
 * import { OnboardingAgent } from "@/agents/onboarding"
 * const agent = new OnboardingAgent({ lead: incomingLead })
 * await agent.run()
 */

export type AgentStatus = "idle" | "running" | "completed" | "failed";

export interface AgentConfig {
  name: string;
  description: string;
  model?: string;
  maxTokens?: number;
}

export interface AgentResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  tokensUsed?: number;
}

// Placeholder export — implement individual agents as separate files
export const AGENT_REGISTRY = {
  onboarding: {
    name: "Onboarding Agent",
    description: "Qualifies new leads via automated WhatsApp conversation",
    status: "planned" as const,
  },
  audit: {
    name: "Website Audit Agent",
    description:
      "Analyzes client websites and generates improvement recommendations",
    status: "planned" as const,
  },
  lead_capture: {
    name: "Lead Capture Agent",
    description:
      "Captures leads from multiple sources and enriches with data",
    status: "planned" as const,
  },
  crm_sync: {
    name: "CRM Sync Agent",
    description: "Syncs conversation data to connected CRM systems",
    status: "planned" as const,
  },
  reporting: {
    name: "Reporting Agent",
    description:
      "Generates automated performance reports for client campaigns",
    status: "planned" as const,
  },
} as const;
