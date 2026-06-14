/**
 * FIGHTERS BUILDERS — Automation Workflows
 *
 * This module defines all business automation workflows.
 * Automations are event-driven sequences that run without human intervention.
 *
 * Planned Automations:
 * ─────────────────────────────────────────────
 * 1. LeadNurture       — Auto-follows up with leads over time
 * 2. OnboardingFlow    — Guides new clients through setup
 * 3. AppointmentReminder — Sends WhatsApp reminders for meetings
 * 4. WeeklyReport      — Generates and sends weekly summaries
 * 5. ReviewRequest     — Requests client reviews post-project
 *
 * Trigger Types:
 * ─────────────────────────────────────────────
 * - Webhook (POST /api/webhooks/[source])
 * - Schedule (cron via Vercel Cron Jobs)
 * - Database event (Drizzle ORM + pg_notify)
 * - Manual (admin panel trigger)
 */

export type TriggerType = "webhook" | "schedule" | "manual" | "event";
export type AutomationStatus = "active" | "paused" | "planned";

export interface AutomationDefinition {
  id: string;
  name: string;
  description: string;
  trigger: TriggerType;
  status: AutomationStatus;
  steps: string[];
}

export const AUTOMATIONS: AutomationDefinition[] = [
  {
    id: "lead-nurture",
    name: "Lead Nurture Flow",
    description:
      "Automatically follows up with new leads over a 7-day sequence via WhatsApp",
    trigger: "webhook",
    status: "planned",
    steps: [
      "Receive lead webhook",
      "Validate and enrich lead data",
      "Send initial WhatsApp greeting",
      "Wait 24h — send value message",
      "Wait 48h — send case study",
      "Wait 72h — send offer/CTA",
      "Log outcome in CRM",
    ],
  },
  {
    id: "appointment-reminder",
    name: "Appointment Reminder",
    description: "Sends WhatsApp reminders 24h and 1h before scheduled calls",
    trigger: "schedule",
    status: "planned",
    steps: [
      "Query upcoming appointments (24h window)",
      "Send 24h reminder via WhatsApp",
      "Send 1h reminder via WhatsApp",
      "Update appointment status",
    ],
  },
  {
    id: "weekly-report",
    name: "Weekly Performance Report",
    description:
      "Generates and sends automated performance summaries every Monday",
    trigger: "schedule",
    status: "planned",
    steps: [
      "Aggregate previous week metrics",
      "Generate AI-written summary",
      "Format as PDF report",
      "Send to client email + WhatsApp",
    ],
  },
  {
    id: "review-request",
    name: "Post-Project Review Request",
    description:
      "Automatically requests client reviews 7 days after project launch",
    trigger: "event",
    status: "planned",
    steps: [
      "Detect project marked as launched",
      "Wait 7 days",
      "Send personalized review request via WhatsApp",
      "Follow up once if no response",
    ],
  },
];
