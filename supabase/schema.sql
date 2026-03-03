-- ============================================================
-- Fighters Builders — Supabase Schema
-- Run this in the Supabase SQL editor after creating a project
-- ============================================================

-- ── EXTENSIONS ────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── PROFILES ──────────────────────────────────────────────
-- Must be created before is_admin() which references it.
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Auto-create a profile row when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── HELPER: is_admin ──────────────────────────────────────
-- Defined after profiles so the table reference resolves at creation time.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

-- RLS
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Admins can update profiles"
  on public.profiles for update
  using (public.is_admin());

-- ── PROJECTS ──────────────────────────────────────────────
create table if not exists public.projects (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  client              text,
  website_url         text not null default '',
  category            text check (category in (
                        'website','automation','crm',
                        'whatsapp','digital-presence','full-system'
                      )),
  description         text,
  full_description    text,
  tags                text[],
  preview_image_path  text,
  results             text[],
  is_featured         boolean not null default false,
  sort_order          integer not null default 0,
  created_at          timestamptz not null default now()
);

-- RLS
alter table public.projects enable row level security;

create policy "Public read access to projects"
  on public.projects for select
  using (true);

create policy "Admins can insert projects"
  on public.projects for insert
  with check (public.is_admin());

create policy "Admins can update projects"
  on public.projects for update
  using (public.is_admin());

create policy "Admins can delete projects"
  on public.projects for delete
  using (public.is_admin());

-- ── LEADS ─────────────────────────────────────────────────
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  phone       text,
  email       text,
  business    text,
  service     text,
  message     text,
  source      text default 'contact_form',
  status      text not null default 'new'
                check (status in ('new','contacted','qualified','closed','lost')),
  created_at  timestamptz not null default now()
);

-- RLS
alter table public.leads enable row level security;

create policy "Anyone can insert a lead"
  on public.leads for insert
  with check (true);

create policy "Admins can read leads"
  on public.leads for select
  using (public.is_admin());

create policy "Admins can update leads"
  on public.leads for update
  using (public.is_admin());

create policy "Admins can delete leads"
  on public.leads for delete
  using (public.is_admin());

-- ── AUDIT_LOG ─────────────────────────────────────────────
create table if not exists public.audit_log (
  id          uuid primary key default gen_random_uuid(),
  admin_id    uuid references auth.users on delete set null,
  action      text not null,
  meta        jsonb,
  created_at  timestamptz not null default now()
);

-- RLS
alter table public.audit_log enable row level security;

create policy "Admins can read audit log"
  on public.audit_log for select
  using (public.is_admin());

create policy "Admins can insert audit log"
  on public.audit_log for insert
  with check (public.is_admin());

-- ── SETTINGS ──────────────────────────────────────────────
create table if not exists public.settings (
  key         text primary key,
  value       text not null,
  updated_at  timestamptz not null default now()
);

-- RLS
alter table public.settings enable row level security;

create policy "Public read access to settings"
  on public.settings for select
  using (true);

create policy "Admins can upsert settings"
  on public.settings for insert
  with check (public.is_admin());

create policy "Admins can update settings"
  on public.settings for update
  using (public.is_admin());

-- ── SEED SETTINGS ─────────────────────────────────────────
insert into public.settings (key, value) values
  ('whatsapp_number',   '972501234567'),
  ('whatsapp_message',  'שלום פייטרס בילדרס! אני מתעניין בשירותים שלכם.'),
  ('cta_headline',      'מוכן לצאת לקרב הדיגיטלי?'),
  ('cta_subheadline',   'ספר לנו על המשימה שלך. אנחנו נבנה אותה בדיוק צבאי.')
on conflict (key) do nothing;

-- ── STORAGE ───────────────────────────────────────────────
-- Run this after creating the bucket "previews" in Supabase Dashboard → Storage:
--
-- insert into storage.buckets (id, name, public) values ('previews', 'previews', true);
--
-- create policy "Public read on previews"
--   on storage.objects for select
--   using (bucket_id = 'previews');
--
-- create policy "Admins can upload to previews"
--   on storage.objects for insert
--   with check (bucket_id = 'previews' and public.is_admin());
--
-- create policy "Admins can delete from previews"
--   on storage.objects for delete
--   using (bucket_id = 'previews' and public.is_admin());
