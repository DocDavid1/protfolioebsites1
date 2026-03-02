# Fighters Builders — AI Assistant Guidelines

## Project Identity

**Fighters Builders** is a premium digital agency website and platform built by three Israeli combat veterans. The codebase is the foundation of a future multi-agent business platform integrating AI, CRM, WhatsApp automation, and lead management.

### Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 — dark-first, no light mode
- **UI Components**: shadcn/ui (Radix primitives)
- **Auth**: BetterAuth with Email/Password
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Vercel AI SDK 5 + OpenRouter (`@openrouter/ai-sdk-provider`)
- **Package Manager**: pnpm (`pnpm` must be in PATH; if not, run `npm install -g pnpm` first)

---

## Brand Design System

The brand is **always dark**. Never add a light mode toggle.

| Token | Value | Use |
|---|---|---|
| Background | `#05050b` | Page background |
| Surface | `#0d0d18` | Cards, panels |
| Electric Blue | `#3b82f6` / `#60a5fa` | Primary accent, CTAs |
| Amber | `#f59e0b` / `#fbbf24` | Warmth, highlights |
| Border | `rgba(255,255,255,0.07)` | Subtle separators |
| Display font | `var(--font-display)` (Rajdhani) | Headlines only |
| Body font | `var(--font-geist-sans)` (Geist) | All body text |

**CSS utility classes defined in `globals.css`:**
- `bg-tactical-grid` — subtle grid background
- `gradient-text-blue` / `gradient-text-amber` / `gradient-text-brand` — gradient text
- `glow-blue` / `glow-amber` — box-shadow glow effects
- `divider-brand` — horizontal gradient divider line
- `surface-card` — standard card background + border
- `animate-fade-up`, `animate-fade-in`, `animate-scale-in` — CSS keyframe animations
- `delay-{100-800}` — animation delay utilities

**Animation rule:** Use `<AnimateIn>` (`src/components/ui/animate-in.tsx`) for scroll-triggered reveals. No Framer Motion. CSS transforms only.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page (assembles all sections)
│   ├── portfolio/page.tsx          # Full portfolio grid
│   ├── about/page.tsx              # Founders story + timeline
│   ├── contact/page.tsx            # Contact form (client component)
│   ├── admin/page.tsx              # Admin panel (placeholder — add auth guard)
│   ├── (auth)/                     # BetterAuth login/register/reset
│   ├── api/
│   │   ├── auth/[...all]/          # BetterAuth catch-all
│   │   └── chat/route.ts           # OpenRouter AI chat endpoint
│   ├── layout.tsx                  # Root layout (Rajdhani + Geist fonts, forced dark)
│   └── globals.css                 # Brand design system + keyframes
├── components/
│   ├── sections/                   # Landing page sections (ALL server components)
│   │   ├── hero.tsx
│   │   ├── services.tsx
│   │   ├── story.tsx
│   │   ├── portfolio-preview.tsx
│   │   └── final-cta.tsx
│   ├── portfolio/                  # Portfolio UI
│   │   ├── browser-window.tsx      # Browser chrome with screenshot preview
│   │   ├── project-card.tsx        # Hover card + modal trigger (client)
│   │   └── project-modal.tsx       # Project detail dialog (client)
│   ├── ui/
│   │   └── animate-in.tsx          # Scroll animation wrapper (client)
│   ├── site-header.tsx             # Sticky nav with mobile menu (client)
│   └── site-footer.tsx             # Footer (server)
├── hooks/
│   └── use-intersection.ts         # IntersectionObserver hook
├── lib/
│   ├── portfolio.ts                # Project data types + mock data
│   ├── ai/index.ts                 # AI model config (OpenRouter)
│   ├── integrations/index.ts       # Integration registry (WhatsApp, CRM, etc.)
│   ├── auth.ts                     # BetterAuth server config
│   ├── auth-client.ts              # BetterAuth client hooks
│   ├── db.ts                       # Database connection
│   ├── schema.ts                   # Drizzle schema
│   └── utils.ts                    # cn() utility
├── agents/index.ts                 # Future AI agent registry
└── automations/index.ts            # Future automation workflow registry
```

---

## Environment Variables

```env
# Database
POSTGRES_URL=postgresql://user:password@localhost:5432/fighters_builders

# Better Auth
BETTER_AUTH_SECRET=32-char-random-string

# AI via OpenRouter
OPENROUTER_API_KEY=sk-or-v1-your-key
OPENROUTER_MODEL=openai/gpt-4o-mini

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# File Storage (optional — local in dev, Vercel Blob in prod)
BLOB_READ_WRITE_TOKEN=
```

---

## Available Scripts

```bash
pnpm run dev          # Start dev server (DON'T run this yourself — ask user)
pnpm run build        # Build for production (runs db:migrate first)
pnpm run build:ci     # Build without database (CI/CD)
pnpm run lint         # ESLint (ALWAYS run after changes)
pnpm run typecheck    # TypeScript check (ALWAYS run after changes)
pnpm run db:generate  # Generate Drizzle migrations
pnpm run db:migrate   # Apply migrations
pnpm run db:push      # Push schema directly (dev only)
pnpm run db:studio    # Open Drizzle Studio GUI
```

---

## Slash Commands

| Command | Purpose |
|---|---|
| `/create-spec` | Create a feature spec with requirements + implementation plan in `/specs/` |
| `/publish-to-github` | Publish a spec to GitHub Issues and Projects |
| `/continue-feature` | Implement the next task from a published GitHub feature |
| `/checkpoint` | Commit current changes with a detailed message |
| `/review-pr` | Review an open pull request |

---

## AI Assistant Rules

### CRITICAL

1. **ALWAYS run lint and typecheck** after completing any code changes:
   ```bash
   pnpm run lint && pnpm run typecheck
   ```

2. **NEVER start the dev server** — ask the user to run it and share output.

3. **Server components by default** — only add `"use client"` when required (state, effects, event handlers).

4. **No dynamic Tailwind class interpolation** — use full class name strings in data structures or inline styles for dynamic values.

5. **Always dark** — never add light mode, don't use `next-themes` toggle.

6. **OpenRouter, not OpenAI directly:**
   ```ts
   import { openrouter } from "@openrouter/ai-sdk-provider"
   // NOT: import { openai } from "@ai-sdk/openai"
   ```

### TypeScript Strictness

This project uses strict TypeScript. Key constraints:
- `noUnusedLocals` / `noUnusedParameters` — no unused imports or variables
- `noUncheckedIndexedAccess` — array/record access may return `T | undefined`; use optional chaining
- `exactOptionalPropertyTypes` — optional props must be explicitly `| undefined`
- React types are globally available via tsconfig — no need to `import React`

### Styling Conventions

- Use `cn()` from `@/lib/utils` for conditional class merging
- Use CSS utility classes from `globals.css` for brand effects
- Use inline styles for values that can't be expressed as static Tailwind classes
- Use `style={{ fontFamily: "var(--font-display)" }}` on headline elements

---

## Common Tasks

### Add a portfolio project

Edit `src/lib/portfolio.ts` — add an entry to the `projects` array:
```ts
{
  id: "7",
  title: "...",
  client: "...",
  website_url: "https://...",
  category: "website", // website | automation | crm | whatsapp | digital-presence | full-system
  description: "Short description",
  full_description: "Full case study text",
  tags: ["Next.js", "CRM"],
  preview_image: "/previews/project-name.jpg",
  results: ["Result 1", "Result 2"],
  created_at: "2025-01-01",
  featured: true,
}
```
Drop the screenshot at `public/previews/project-name.jpg`.

### Add a new page

1. Create `src/app/[route]/page.tsx` as a Server Component
2. Add to nav links in `src/components/site-header.tsx` (`NAV_LINKS` array)
3. Add to footer links in `src/components/site-footer.tsx` (`FOOTER_LINKS`)

### Add a landing page section

1. Create `src/components/sections/[name].tsx` (Server Component)
2. Use `<AnimateIn>` for scroll animations
3. Import and add to `src/app/page.tsx`

### Protect a route (auth guard)

```ts
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const session = await auth.api.getSession({ headers: await headers() })
if (!session?.user) redirect("/login")
```

### Add an API route

1. Create `src/app/api/[route]/route.ts`
2. Export named HTTP handlers: `GET`, `POST`, etc.
3. Return `Response` objects

### Work with the database

1. Update schema: `src/lib/schema.ts`
2. Generate migration: `pnpm run db:generate`
3. Apply: `pnpm run db:migrate`
4. Query: `import { db } from "@/lib/db"`

### Add an AI agent (future)

1. Create `src/agents/[name].ts`
2. Register in `src/agents/index.ts` `AGENT_REGISTRY`
3. Use OpenRouter via `@openrouter/ai-sdk-provider`

### Add an integration

1. Create `src/lib/integrations/[name].ts`
2. Register in `src/lib/integrations/index.ts`
3. Add required env vars to `env.example`

---

## WhatsApp Contact

All WhatsApp links use the same pattern. The number is `972501234567` (replace with real number before launch):

```ts
const WHATSAPP_URL = `https://wa.me/972501234567?text=${encodeURIComponent("Hello!")}`
```

Search the codebase for `972501234567` to update all instances at once.

---

## Future Platform Roadmap

The codebase is scaffolded for:

- `src/agents/` — AI agents (onboarding, audit, lead capture, CRM sync, reporting)
- `src/automations/` — Automation workflows (lead nurture, appointment reminders, weekly reports)
- `src/lib/ai/` — AI model configuration (OpenRouter models)
- `src/lib/integrations/` — External integrations (WhatsApp Business API, HubSpot, Stripe, etc.)
- `src/app/admin/` — Protected operations center (add BetterAuth guard before going live)
