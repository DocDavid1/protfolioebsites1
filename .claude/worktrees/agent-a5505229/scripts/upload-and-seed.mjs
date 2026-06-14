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

const BUCKET = "previews";

const images = [
  { slug: "kosher-store", file: "kosher-store.png" },
  { slug: "artsolute", file: "artsolute.png" },
  { slug: "miami-renovate", file: "miami-renovate.png" },
  { slug: "agentdeal", file: "agentdeal.png" },
  { slug: "fighters-builders", file: "fighters-builders.png" },
  { slug: "tfm-traders", file: "tfm-traders.png" },
];

const projects = [
  {
    title: "חנות אופנה כשרה — בצנייעס",
    client: "בצנייעס",
    website_url: "https://kosher-store.com/",
    category: "website",
    description: "חנות אי-קומרס לאופנה צנועה עם קטלוג מוצרים, עגלת קניות, בלוג ומערכת ניהול תוכן. נבנה למכירה ולנוכחות דיגיטלית חזקה.",
    full_description: "בנינו חנות אי-קומרס מלאה לבצנייעס — מותג אופנה כשרה וצנועה. האתר כולל קטלוג מוצרים עשיר, ניהול מלאי, עגלת קניות, בלוג ותמיכה בעברית ואנגלית.",
    tags: ["WooCommerce", "אי-קומרס", "RTL"],
    preview_image_path: "kosher-store.png",
    results: ["השקה מוצלחת תוך 3 שבועות", "ניהול מלאי מלא", "תמיכה דו-לשונית"],
    is_featured: true, sort_order: 1, created_at: "2025-01-15",
  },
  {
    title: "ARTSolute — פלטפורמה לאמנים ישראלים",
    client: "ARTSolute",
    website_url: "https://artsolute-the-artist-s-sanctuary.vercel.app/",
    category: "full-system",
    description: "פלטפורמה המחברת בין אמנים ישראלים לאוהבי אמנות. מכירת יצירות מקוריות, קהילה, קבוצות ופרופילי אמנים.",
    full_description: "פיתחנו פלטפורמה דיגיטלית מלאה לקהילת האמנות הישראלית — אמנים מציגים ומוכרים יצירות מקוריות, קהילה פעילה עם קבוצות נושאיות ומערכת תשלום מאובטחת.",
    tags: ["Next.js", "פלטפורמה", "קהילה"],
    preview_image_path: "artsolute.png",
    results: ["קהילה פעילה", "מכירת יצירות אמנות", "אמנים מאומתים"],
    is_featured: true, sort_order: 2, created_at: "2025-02-10",
  },
  {
    title: "Miami Renovate — חברת שיפוץ יוקרה",
    client: "Miami Renovate",
    website_url: "https://miamirenovate.com/",
    category: "website",
    description: "אתר יוקרתי לחברת שיפוץ ועיצוב פנים במיאמי. עיצוב ויזואלי חזק, גלריית פרויקטים ומערכת פניות לקוחות.",
    full_description: "אתר תדמית יוקרתי לחברת שיפוץ ועיצוב פנים פרמיום. האתר מציג פרויקטים, שירותים, ומאפשר פנייה לייעוץ ראשוני — עם דגש על אמינות ואסתטיקה.",
    tags: ["WordPress", "עיצוב יוקרה", "Lead Generation"],
    preview_image_path: "miami-renovate.png",
    results: ["פניות לקוחות +150%", "נוכחות מקצועית חזקה", "Lighthouse 90+"],
    is_featured: true, sort_order: 3, created_at: "2024-12-01",
  },
  {
    title: "Agent. — מערכת CRM לנדל״ן",
    client: "AgentDeal",
    website_url: "https://agentdeal.space/",
    category: "crm",
    description: 'מערכת CRM מתקדמת לסוכני נדל״ן: ניהול לידים, נכסים, משימות ועסקאות. כולל כלי AI לשיפור תמונות נכסים.',
    full_description: 'פיתחנו מערכת CRM מלאה לשוק הנדל״ן הישראלי — ממשק עברי, ניהול לידים חכם, יומן משימות, דוחות ביצועים וכלי AI לניקוי תמונות נכסים בלחיצה אחת.',
    tags: ["Next.js", "CRM", "AI", "נדל״ן"],
    preview_image_path: "agentdeal.png",
    results: ["500+ סוכנים פעילים", "10,000+ עסקאות נסגרו", "דירוג 4.8/5"],
    is_featured: true, sort_order: 4, created_at: "2025-01-01",
  },
  {
    title: "Fighters Builders — אתר הסוכנות",
    client: "Fighters Builders",
    website_url: "https://protfolioebsites1.vercel.app/",
    category: "website",
    description: "אתר הבית של פייטרס בילדרס — עיצוב כהה פרמיום, אנימציות מתקדמות, פורטפוליו, ומערכת ניהול תוכן.",
    full_description: "בנינו את אתר הסוכנות שלנו עצמנו — עם Next.js 16, Supabase, עיצוב כהה-לחלוטין, ממשק עברי RTL, ואנימציות CSS מתקדמות. פורטפוליו חי, אדמין מוגן ועוד.",
    tags: ["Next.js", "Supabase", "TypeScript", "RTL"],
    preview_image_path: "fighters-builders.png",
    results: ["ביצועי Lighthouse 95+", "טעינה מתחת ל-1 שנייה", "CMS מובנה"],
    is_featured: true, sort_order: 5, created_at: "2025-03-01",
  },
  {
    title: "TFM Traders — פלטפורמת מסחר",
    client: "TFM Traders",
    website_url: "https://tfm-traders.com/",
    category: "full-system",
    description: "פלטפורמת מסחר קריפטו עם חנות מוצרים, קהילת דיסקורד, אינדיקטורים חכמים ותוכן לימודי לסוחרים.",
    full_description: "בנינו פלטפורמה מסחרית מקיפה עבור TFM Traders — חנות מוצרי מסחר, קטיקר קריפטו בזמן אמת, שרת דיסקורד פעיל ומערכת תוכן לימודי לסוחרים ישראלים.",
    tags: ["WordPress", "WooCommerce", "Crypto", "קהילה"],
    preview_image_path: "tfm-traders.png",
    results: ["קהילה פעילה", "מוצרי מסחר דיגיטליים", "נוכחות מולטי-פלטפורמה"],
    is_featured: true, sort_order: 6, created_at: "2024-11-15",
  },
];

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
    if (error) {
      console.error("❌ Failed to create bucket:", error.message);
      process.exit(1);
    }
    console.log(`✅ Created storage bucket "${BUCKET}"`);
  } else {
    console.log(`✅ Bucket "${BUCKET}" already exists`);
  }
}

async function uploadImages() {
  const previewsDir = join(__dirname, "../public/previews");
  for (const { slug, file } of images) {
    const filePath = join(previewsDir, file);
    const fileData = readFileSync(filePath);
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(file, fileData, { contentType: "image/png", upsert: true });
    if (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message);
    } else {
      console.log(`  ✅ Uploaded ${file}`);
    }
  }
}

async function seedProjects() {
  // Test connection
  const { error: testErr } = await supabase.from("projects").select("count").limit(1);
  if (testErr) {
    console.error("❌ Cannot reach projects table:", testErr.message);
    process.exit(1);
  }

  // Clear existing
  await supabase.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  console.log("🗑️  Cleared existing projects");

  // Insert 6 real projects
  const { data, error } = await supabase.from("projects").insert(projects).select();
  if (error) {
    console.error("❌ Insert failed:", error.message);
    process.exit(1);
  }

  console.log(`✅ Inserted ${data.length} projects into Supabase`);
  data.forEach((p, i) => console.log(`  ${i + 1}. ${p.title}`));
}

async function run() {
  console.log("Connecting to:", supabaseUrl);

  console.log("\n📦 Step 1: Ensure storage bucket...");
  await ensureBucket();

  console.log("\n🖼️  Step 2: Uploading screenshots...");
  await uploadImages();

  console.log("\n🌱 Step 3: Seeding projects...");
  await seedProjects();

  console.log("\n🎉 Done! 6 real projects with screenshots are live in Supabase.");
}

run();
