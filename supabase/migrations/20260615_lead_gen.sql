-- ============================================================
-- Migration: Lead Generation System
-- Run in Supabase SQL editor
-- ============================================================

-- ── LEADS TABLE (add missing consent fields) ──────────────
alter table public.leads
  add column if not exists privacy_policy_accepted boolean not null default false,
  add column if not exists consent_to_contact      boolean not null default false,
  add column if not exists marketing_consent       boolean not null default false,
  add column if not exists privacy_policy_version  text    default '1.0',
  add column if not exists source_page             text;

-- ── USER ROLES ────────────────────────────────────────────
-- Extend profiles with a role column
alter table public.profiles
  add column if not exists role text not null default 'admin'
    check (role in ('owner', 'admin', 'editor'));

-- ── BUSINESS LEADS ────────────────────────────────────────
-- Leads generated via the lead-gen search tool (Google Places etc.)
-- Distinct from contact-form leads in the `leads` table.
create table if not exists public.business_leads (
  id              uuid primary key default gen_random_uuid(),
  -- Business identity
  name            text not null,
  category        text,
  address         text,
  city            text,
  country         text default 'IL',
  phone           text,
  website         text,
  google_maps_url text,
  place_id        text unique,          -- Google Place ID (prevents duplicates)
  -- Signals
  google_rating   numeric(2,1),
  review_count    integer,
  has_website     boolean default false,
  -- Lead score (0–100)
  score           integer default 0 check (score between 0 and 100),
  score_reasons   text[],               -- array of reason strings
  -- CRM status
  status          text not null default 'new'
                    check (status in ('new','qualified','contacted','follow_up','won','lost')),
  -- Search context
  search_query    text,
  -- Timestamps
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists business_leads_status_idx   on public.business_leads (status);
create index if not exists business_leads_score_idx    on public.business_leads (score desc);
create index if not exists business_leads_city_idx     on public.business_leads (city);
create index if not exists business_leads_created_idx  on public.business_leads (created_at desc);

alter table public.business_leads enable row level security;

create policy "Admins can manage business leads"
  on public.business_leads for all
  using (public.is_admin())
  with check (public.is_admin());

-- ── WEBSITE AUDITS ────────────────────────────────────────
create table if not exists public.lead_audits (
  id                  uuid primary key default gen_random_uuid(),
  lead_id             uuid not null references public.business_leads on delete cascade,
  audited_at          timestamptz not null default now(),
  -- HTTP / connectivity
  http_status         integer,
  is_https            boolean,
  redirects_to_https  boolean,
  -- Page metadata
  page_title          text,
  meta_description    text,
  has_favicon         boolean,
  -- Performance estimates
  load_speed_ms       integer,          -- estimated load time
  mobile_friendly     boolean,
  -- Content signals
  has_cta             boolean,
  has_contact_form    boolean,
  has_phone           boolean,
  -- Social / SEO
  social_links        text[],
  -- Raw audit JSON for anything else
  raw                 jsonb,
  -- Score contribution from audit
  audit_score_delta   integer default 0
);

alter table public.lead_audits enable row level security;

create policy "Admins can manage lead audits"
  on public.lead_audits for all
  using (public.is_admin())
  with check (public.is_admin());

-- ── TOUCHPOINTS (7-touch outreach tracking) ───────────────
create table if not exists public.lead_touchpoints (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid not null references public.business_leads on delete cascade,
  touch_number    integer not null check (touch_number between 1 and 7),
  channel         text check (channel in ('whatsapp','email','phone','linkedin','manual','pdf')),
  status          text not null default 'draft'
                    check (status in ('draft','sent','opened','replied')),
  content         text,               -- generated message / report content
  notes           text,
  reminder_date   date,
  sent_at         timestamptz,
  created_at      timestamptz not null default now(),
  unique (lead_id, touch_number)
);

alter table public.lead_touchpoints enable row level security;

create policy "Admins can manage touchpoints"
  on public.lead_touchpoints for all
  using (public.is_admin())
  with check (public.is_admin());

-- ── LEAD REPORTS ──────────────────────────────────────────
create table if not exists public.lead_reports (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.business_leads on delete cascade,
  content     jsonb not null,          -- structured report data
  created_at  timestamptz not null default now()
);

alter table public.lead_reports enable row level security;

create policy "Admins can manage lead reports"
  on public.lead_reports for all
  using (public.is_admin())
  with check (public.is_admin());

-- ── TRIGGER: update business_leads.updated_at ─────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists business_leads_updated_at on public.business_leads;
create trigger business_leads_updated_at
  before update on public.business_leads
  for each row execute function public.set_updated_at();
