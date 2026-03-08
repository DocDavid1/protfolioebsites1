-- ============================================================
-- Fighters Builders — Full Supabase Setup
-- Run this entire file in Supabase → SQL Editor
-- ============================================================

-- Projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client text,
  website_url text not null default '',
  category text,
  description text,
  full_description text,
  tags text[],
  preview_image_path text,
  results text[],
  is_featured boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Leads table
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  email text,
  business text,
  service text,
  message text,
  source text,
  status text default 'new',
  created_at timestamptz default now()
);

-- Admin profiles (linked to auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean default false,
  created_at timestamptz default now()
);

-- Audit log
create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid,
  action text not null,
  meta jsonb,
  created_at timestamptz default now()
);

-- Settings
create table if not exists settings (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

-- Auto-create profile row when a new user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- Portfolio Data — 8 projects
-- ============================================================

insert into projects (title, client, website_url, category, description, full_description, tags, results, is_featured, sort_order, created_at)
values
(
  'פלטפורמת נדל"ן יוקרתית',
  'Premium Realty Group',
  'https://example.com',
  'full-system',
  'פלטפורמת נדל"ן מלאה עם לכידת לידים בוואטסאפ, מעקבים אוטומטיים ואינטגרציית CRM. זמן תגובה ללידים ירד מ-24 שעות ל-3 דקות.',
  'בנינו נוכחות דיגיטלית מלאה לקבוצת נדל"ן יוקרתית — אתר תצוגת נכסים ברמה גבוהה עם מערכת אוטומציית וואטסאפ שלוכדת לידים 24/7.',
  array['Next.js', 'WhatsApp API', 'CRM'],
  array['פי 3 יותר לידים', 'זמן תגובה: 24ש ← 3 דק׳', 'המרה +40%'],
  true, 1, '2024-11-01'
),
(
  'מרכז דיגיטלי לרשת מסעדות',
  'Grill Masters Group',
  'https://example.com',
  'website',
  'אתר מסעדה רב-סניפי עם הזמנות אונליין, מערכת הזמנת שולחנות וניהול תפריט דיגיטלי. נבנה למהירות ולהמרה.',
  'אתר בעל ביצועים גבוהים לרשת מסעדות עם 8 סניפים, הזמנות שולחן בזמן אמת ואישורים בוואטסאפ.',
  array['Next.js', 'הזמנות אונליין', 'SEO'],
  array['הזמנות אונליין +200%', 'טעינה מתחת ל-1.2 שניות', 'Mobile-first'],
  true, 2, '2024-09-15'
),
(
  'אוטומציית מכירות בוואטסאפ',
  'Scale Commerce Ltd',
  'https://example.com',
  'whatsapp',
  'מערכת אוטומציה מקצה לקצה בוואטסאפ: מלכידת לידים ועד סגירת עסקה. מעבד 500+ שיחות ביום ללא התערבות אנושית.',
  'צינור אוטומציית וואטסאפ שמטפל במשפך המכירות כולו באופן עצמאי — מסיוק ועד רכישה.',
  array['WhatsApp Business API', 'אוטומציה', 'CRM'],
  array['500+ שיחות ביום', 'סגירה 32% ללא מגע', 'ROI תוך 30 יום'],
  true, 3, '2024-08-10'
),
(
  'מערכת ניהול מרפאה רפואית',
  'Tel Aviv Medical Group',
  'https://example.com',
  'crm',
  'מערכת ניהול מטופלים מלאה עם הזמנת תורים, תזכורות אוטומטיות ואישורים בוואטסאפ.',
  'פלטפורמת ניהול מאוחדת לקבוצה רפואית. מטופלים מזמינים אונליין, מקבלים תזכורות בוואטסאפ, אי-הגעות ירדו ב-60%.',
  array['CRM', 'תזכורות וואטסאפ', 'לוח בקרה'],
  array['אי-הגעות -60%', 'יעילות צוות +45%', 'שביעות רצון 9.4/10'],
  true, 4, '2024-07-20'
),
(
  'מיתוג ונוכחות אי-קומרס',
  'Urban Thread Co.',
  'https://example.com',
  'digital-presence',
  'נוכחות דיגיטלית מלאה לסטארטאפ אופנה — אתר, רשתות חברתיות, קטלוג וואטסאפ ו-SEO מיסודי.',
  'לקחנו סטארטאפ אופנה מאפס לנוכחות דיגיטלית פעילה מלאה תוך 3 שבועות.',
  array['אי-קומרס', 'SEO', 'מסחר חברתי'],
  array['0 ← 10K מבקרים/חודש', 'מכירה ראשונה תוך 48ש', 'עמוד 1 בגוגל תוך 6 שבועות'],
  true, 5, '2024-06-05'
),
(
  'מכונת לידים B2B',
  'Apex Industrial Solutions',
  'https://example.com',
  'automation',
  'צינור לידים אוטומטי B2B: דפי נחיתה, סיוק בוואטסאפ וסנכרון CRM. משפך מלא בטייס אוטומטי.',
  'מכונת יצירת לידים B2B — פוטנציאל לקוחות נוחתים בדפים ממוטבים ונכנסים לרצף סיוק אוטומטי.',
  array['יצירת לידים', 'B2B', 'סנכרון CRM'],
  array['120 לידים מוסיקים/חודש', 'עלות לליד -65%', 'מחזור מכירות -40%'],
  true, 6, '2024-05-12'
),
(
  'אתר משרד עורכי דין',
  'Cohen & Partners Law',
  'https://example.com',
  'website',
  'אתר יוקרתי למשרד עורכי דין עם מערכת פגישות, שאלון לקוח אוטומטי ולכידת לידים בוואטסאפ.',
  'אתר מקצועי עם לכידת לידים חכמה — כל פנייה נכנסת לוואטסאפ ומוסיקת אוטומטית.',
  array['Next.js', 'לכידת לידים', 'WhatsApp'],
  array['פניות חדשות +180%', 'זמן תגובה ללקוח -80%', 'Lighthouse 98'],
  true, 7, '2024-04-08'
),
(
  'CRM לסוכנות רכב',
  'Drive Elite Motors',
  'https://example.com',
  'crm',
  'מערכת CRM מותאמת לסוכנות רכב: מעקב לידים, תזכורות טסט-דרייב, ורצף המרה בוואטסאפ.',
  'פיתחנו CRM ייעודי לסוכנות רכב — כל ליד עובר רצף וואטסאפ שמוביל לפגישה ולמכירה.',
  array['CRM', 'WhatsApp API', 'אוטומציה'],
  array['סגירות +55%', 'תורי טסט-דרייב +90%', 'ROI תוך 45 יום'],
  true, 8, '2024-03-20'
)
on conflict do nothing;

-- ============================================================
-- Done! Now:
-- 1. Go to Authentication → Users → Add user (your email + password)
-- 2. Run this to make yourself admin:
--    update profiles set is_admin = true
--    where id = (select id from auth.users where email = 'YOUR_EMAIL');
-- ============================================================
