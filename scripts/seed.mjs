import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load env vars from .env.local
const envFile = readFileSync(join(__dirname, "../.env.local"), "utf8");
const env = Object.fromEntries(
  envFile.split("\n").filter(l => l && !l.startsWith("#")).map(l => l.split("=").map((p, i) => i === 0 ? p.trim() : l.slice(l.indexOf("=") + 1).trim()))
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const projects = [
  {
    title: 'פלטפורמת נדל"ן יוקרתית',
    client: "Premium Realty Group",
    website_url: "https://example.com",
    category: "full-system",
    description: 'פלטפורמת נדל"ן מלאה עם לכידת לידים בוואטסאפ, מעקבים אוטומטיים ואינטגרציית CRM. זמן תגובה ללידים ירד מ-24 שעות ל-3 דקות.',
    full_description: 'בנינו נוכחות דיגיטלית מלאה לקבוצת נדל"ן יוקרתית — אתר תצוגת נכסים ברמה גבוהה עם מערכת אוטומציית וואטסאפ שלוכדת לידים 24/7.',
    tags: ["Next.js", "WhatsApp API", "CRM"],
    results: ["פי 3 יותר לידים", "זמן תגובה: 24ש ← 3 דק׳", "המרה +40%"],
    is_featured: true, sort_order: 1, created_at: "2024-11-01",
  },
  {
    title: "מרכז דיגיטלי לרשת מסעדות",
    client: "Grill Masters Group",
    website_url: "https://example.com",
    category: "website",
    description: "אתר מסעדה רב-סניפי עם הזמנות אונליין, מערכת הזמנת שולחנות וניהול תפריט דיגיטלי. נבנה למהירות ולהמרה.",
    full_description: "אתר בעל ביצועים גבוהים לרשת מסעדות עם 8 סניפים, הזמנות שולחן בזמן אמת ואישורים בוואטסאפ.",
    tags: ["Next.js", "הזמנות אונליין", "SEO"],
    results: ["הזמנות אונליין +200%", "טעינה מתחת ל-1.2 שניות", "Mobile-first"],
    is_featured: true, sort_order: 2, created_at: "2024-09-15",
  },
  {
    title: "אוטומציית מכירות בוואטסאפ",
    client: "Scale Commerce Ltd",
    website_url: "https://example.com",
    category: "whatsapp",
    description: "מערכת אוטומציה מקצה לקצה בוואטסאפ: מלכידת לידים ועד סגירת עסקה. מעבד 500+ שיחות ביום ללא התערבות אנושית.",
    full_description: "צינור אוטומציית וואטסאפ שמטפל במשפך המכירות כולו באופן עצמאי — מסיוק ועד רכישה.",
    tags: ["WhatsApp Business API", "אוטומציה", "CRM"],
    results: ["500+ שיחות ביום", "סגירה 32% ללא מגע", "ROI תוך 30 יום"],
    is_featured: true, sort_order: 3, created_at: "2024-08-10",
  },
  {
    title: "מערכת ניהול מרפאה רפואית",
    client: "Tel Aviv Medical Group",
    website_url: "https://example.com",
    category: "crm",
    description: "מערכת ניהול מטופלים מלאה עם הזמנת תורים, תזכורות אוטומטיות ואישורים בוואטסאפ.",
    full_description: "פלטפורמת ניהול מאוחדת לקבוצה רפואית. מטופלים מזמינים אונליין, מקבלים תזכורות בוואטסאפ, אי-הגעות ירדו ב-60%.",
    tags: ["CRM", "תזכורות וואטסאפ", "לוח בקרה"],
    results: ["אי-הגעות -60%", "יעילות צוות +45%", "שביעות רצון 9.4/10"],
    is_featured: true, sort_order: 4, created_at: "2024-07-20",
  },
  {
    title: "מיתוג ונוכחות אי-קומרס",
    client: "Urban Thread Co.",
    website_url: "https://example.com",
    category: "digital-presence",
    description: "נוכחות דיגיטלית מלאה לסטארטאפ אופנה — אתר, רשתות חברתיות, קטלוג וואטסאפ ו-SEO מיסודי.",
    full_description: "לקחנו סטארטאפ אופנה מאפס לנוכחות דיגיטלית פעילה מלאה תוך 3 שבועות.",
    tags: ["אי-קומרס", "SEO", "מסחר חברתי"],
    results: ["0 ← 10K מבקרים/חודש", "מכירה ראשונה תוך 48ש", "עמוד 1 בגוגל תוך 6 שבועות"],
    is_featured: true, sort_order: 5, created_at: "2024-06-05",
  },
  {
    title: "מכונת לידים B2B",
    client: "Apex Industrial Solutions",
    website_url: "https://example.com",
    category: "automation",
    description: "צינור לידים אוטומטי B2B: דפי נחיתה, סיוק בוואטסאפ וסנכרון CRM. משפך מלא בטייס אוטומטי.",
    full_description: "מכונת יצירת לידים B2B — פוטנציאל לקוחות נוחתים בדפים ממוטבים ונכנסים לרצף סיוק אוטומטי.",
    tags: ["יצירת לידים", "B2B", "סנכרון CRM"],
    results: ["120 לידים מוסיקים/חודש", "עלות לליד -65%", "מחזור מכירות -40%"],
    is_featured: true, sort_order: 6, created_at: "2024-05-12",
  },
  {
    title: "אתר משרד עורכי דין",
    client: "Cohen & Partners Law",
    website_url: "https://example.com",
    category: "website",
    description: "אתר יוקרתי למשרד עורכי דין עם מערכת פגישות, שאלון לקוח אוטומטי ולכידת לידים בוואטסאפ.",
    full_description: "אתר מקצועי עם לכידת לידים חכמה — כל פנייה נכנסת לוואטסאפ ומוסיקת אוטומטית.",
    tags: ["Next.js", "לכידת לידים", "WhatsApp"],
    results: ["פניות חדשות +180%", "זמן תגובה ללקוח -80%", "Lighthouse 98"],
    is_featured: true, sort_order: 7, created_at: "2024-04-08",
  },
  {
    title: "CRM לסוכנות רכב",
    client: "Drive Elite Motors",
    website_url: "https://example.com",
    category: "crm",
    description: "מערכת CRM מותאמת לסוכנות רכב: מעקב לידים, תזכורות טסט-דרייב, ורצף המרה בוואטסאפ.",
    full_description: "פיתחנו CRM ייעודי לסוכנות רכב — כל ליד עובר רצף וואטסאפ שמוביל לפגישה ולמכירה.",
    tags: ["CRM", "WhatsApp API", "אוטומציה"],
    results: ["סגירות +55%", "תורי טסט-דרייב +90%", "ROI תוך 45 יום"],
    is_featured: true, sort_order: 8, created_at: "2024-03-20",
  },
];

async function run() {
  console.log("Connecting to:", supabaseUrl);

  // Test connection
  const { error: testErr } = await supabase.from("projects").select("count").limit(1);
  if (testErr) {
    console.error("❌ Cannot reach projects table:", testErr.message);
    console.error("→ Make sure you ran scripts/setup-supabase.sql in Supabase SQL Editor first");
    process.exit(1);
  }

  // Clear existing and insert fresh
  await supabase.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  const { data, error } = await supabase.from("projects").insert(projects).select();
  if (error) {
    console.error("❌ Insert failed:", error.message);
    process.exit(1);
  }

  console.log(`✅ Inserted ${data.length} projects into Supabase`);
  data.forEach((p, i) => console.log(`  ${i + 1}. ${p.title}`));
}

run();
