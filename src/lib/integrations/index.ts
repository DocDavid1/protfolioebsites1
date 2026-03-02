/**
 * FIGHTERS BUILDERS — External Integrations
 *
 * This module is the registry for all third-party integrations.
 *
 * Planned Integrations:
 * ─────────────────────────────────────────────
 * 1. WhatsApp Business API  — Lead capture, automation, notifications
 * 2. HubSpot / Pipedrive    — CRM sync
 * 3. Google Analytics       — Traffic analytics
 * 4. Make (Integromat)      — Visual automation builder
 * 5. Twilio                 — SMS fallback
 * 6. Stripe                 — Payment processing
 * 7. Notion                 — Project documentation sync
 * 8. Slack                  — Internal team notifications
 *
 * File structure (to be implemented):
 * ─────────────────────────────────────────────
 * src/lib/integrations/
 *   ├── index.ts          (this file — registry)
 *   ├── whatsapp.ts       WhatsApp Business API client
 *   ├── crm.ts            CRM adapter (supports HubSpot, Pipedrive)
 *   ├── analytics.ts      Analytics event tracking
 *   ├── payments.ts       Stripe integration
 *   └── notifications.ts  Multi-channel notification dispatcher
 */

export type IntegrationStatus = "active" | "planned" | "disabled";

export interface Integration {
  id: string;
  name: string;
  category: "messaging" | "crm" | "analytics" | "automation" | "payments";
  status: IntegrationStatus;
  envVars: string[];
  docs?: string;
}

export const INTEGRATION_REGISTRY: Integration[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Business API",
    category: "messaging",
    status: "planned",
    envVars: ["WHATSAPP_ACCESS_TOKEN", "WHATSAPP_PHONE_NUMBER_ID", "WHATSAPP_WEBHOOK_VERIFY_TOKEN"],
    docs: "https://developers.facebook.com/docs/whatsapp",
  },
  {
    id: "hubspot",
    name: "HubSpot CRM",
    category: "crm",
    status: "planned",
    envVars: ["HUBSPOT_API_KEY", "HUBSPOT_PORTAL_ID"],
    docs: "https://developers.hubspot.com",
  },
  {
    id: "google-analytics",
    name: "Google Analytics 4",
    category: "analytics",
    status: "planned",
    envVars: ["NEXT_PUBLIC_GA_MEASUREMENT_ID"],
    docs: "https://developers.google.com/analytics",
  },
  {
    id: "stripe",
    name: "Stripe Payments",
    category: "payments",
    status: "planned",
    envVars: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"],
    docs: "https://stripe.com/docs",
  },
  {
    id: "make",
    name: "Make (Integromat)",
    category: "automation",
    status: "planned",
    envVars: ["MAKE_WEBHOOK_URL"],
    docs: "https://www.make.com/en/api-documentation",
  },
];

export const getActiveIntegrations = () =>
  INTEGRATION_REGISTRY.filter((i) => i.status === "active");

export const getIntegrationsByCategory = (
  category: Integration["category"]
) => INTEGRATION_REGISTRY.filter((i) => i.category === category);
