/**
 * FIGHTERS BUILDERS — AI Configuration
 *
 * Centralized AI provider configuration for all AI-powered features.
 * Uses OpenRouter to access 100+ models via a single unified API.
 *
 * Current provider: OpenRouter (@openrouter/ai-sdk-provider)
 * Default model: configurable via OPENROUTER_MODEL env var
 *
 * Planned AI Features:
 * ─────────────────────────────────────────────
 * - Lead qualification conversations
 * - Website audit analysis
 * - Automated report generation
 * - Content personalization
 * - Chatbot for client websites
 */

export const AI_MODELS = {
  // Fast, cheap — for simple classification and short responses
  fast: "openai/gpt-4o-mini",

  // Balanced — for most agent tasks
  balanced: "openai/gpt-4o",

  // Most capable — for complex analysis and generation
  powerful: "anthropic/claude-3-5-sonnet",

  // Reasoning — for structured data extraction
  reasoning: "google/gemini-pro-1.5",
} as const;

export type AIModel = keyof typeof AI_MODELS;

export interface AITaskConfig {
  model: AIModel;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export const AI_TASK_DEFAULTS: Record<string, AITaskConfig> = {
  lead_qualification: {
    model: "balanced",
    maxTokens: 1024,
    temperature: 0.7,
    systemPrompt:
      "You are a professional business consultant for Fighters Builders, a premium digital agency. Qualify leads by understanding their business needs, budget, and timeline. Be concise and professional.",
  },
  website_audit: {
    model: "powerful",
    maxTokens: 4096,
    temperature: 0.3,
    systemPrompt:
      "You are a senior web performance and UX analyst. Analyze websites for performance, accessibility, SEO, and conversion optimization opportunities. Provide actionable, prioritized recommendations.",
  },
  report_generation: {
    model: "balanced",
    maxTokens: 2048,
    temperature: 0.5,
    systemPrompt:
      "You are a professional business analyst. Generate clear, concise performance reports that highlight key metrics, wins, and recommendations.",
  },
};
