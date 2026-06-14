-- Add consent fields to leads table (run in Supabase SQL Editor)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS privacy_policy_accepted boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_to_contact boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS marketing_consent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS privacy_policy_version text DEFAULT '1.0',
  ADD COLUMN IF NOT EXISTS source_page text;

-- Site settings table for editable legal/business config
CREATE TABLE IF NOT EXISTS site_settings (
  id text PRIMARY KEY DEFAULT 'default',
  business_name text DEFAULT '[שם העסק]',
  business_email text DEFAULT 'hello@fightersbuilders.com',
  business_phone text DEFAULT '972501234567',
  accessibility_contact_name text DEFAULT '[שם רכז נגישות]',
  accessibility_contact_email text DEFAULT 'hello@fightersbuilders.com',
  last_accessibility_review date DEFAULT CURRENT_DATE,
  privacy_policy_version text DEFAULT '1.0',
  terms_version text DEFAULT '1.0',
  updated_at timestamptz DEFAULT now()
);

INSERT INTO site_settings (id) VALUES ('default') ON CONFLICT DO NOTHING;
