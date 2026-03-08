export type ProjectCategory =
  | "website"
  | "automation"
  | "crm"
  | "whatsapp"
  | "digital-presence"
  | "full-system";

export interface Project {
  id: string;
  title: string;
  client: string;
  website_url: string;
  category: ProjectCategory;
  description: string;
  full_description?: string | undefined;
  tags: string[];
  preview_image: string;
  results?: string[] | undefined;
  created_at: string;
  featured?: boolean | undefined;
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  website: "אתר",
  automation: "אוטומציה",
  crm: "מערכת CRM",
  whatsapp: "וואטסאפ",
  "digital-presence": "נוכחות דיגיטלית",
  "full-system": "מערכת מלאה",
};

export const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  website: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  automation: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  crm: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  whatsapp: "text-green-400 bg-green-400/10 border-green-400/20",
  "digital-presence": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "full-system": "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

export const projects: Project[] = [
  {
    id: "1",
    title: 'פלטפורמת נדל"ן יוקרתית',
    client: "Premium Realty Group",
    website_url: "https://example.com",
    category: "full-system",
    description: 'פלטפורמת נדל"ן מלאה עם לכידת לידים בוואטסאפ, מעקבים אוטומטיים ואינטגרציית CRM. זמן תגובה ללידים ירד מ-24 שעות ל-3 דקות.',
    full_description: 'בנינו נוכחות דיגיטלית מלאה לקבוצת נדל"ן יוקרתית — אתר תצוגת נכסים ברמה גבוהה עם מערכת אוטומציית וואטסאפ שלוכדת לידים 24/7.',
    tags: ["Next.js", "WhatsApp API", "CRM"],
    preview_image: "",
    results: ["פי 3 יותר לידים", "זמן תגובה: 24ש ← 3 דק׳", "המרה +40%"],
    created_at: "2024-11-01",
    featured: true,
  },
  {
    id: "2",
    title: "מרכז דיגיטלי לרשת מסעדות",
    client: "Grill Masters Group",
    website_url: "https://example.com",
    category: "website",
    description: "אתר מסעדה רב-סניפי עם הזמנות אונליין, מערכת הזמנת שולחנות וניהול תפריט דיגיטלי. נבנה למהירות ולהמרה.",
    full_description: "אתר בעל ביצועים גבוהים לרשת מסעדות עם 8 סניפים, הזמנות שולחן בזמן אמת ואישורים בוואטסאפ.",
    tags: ["Next.js", "הזמנות אונליין", "SEO"],
    preview_image: "",
    results: ["הזמנות אונליין +200%", "טעינה מתחת ל-1.2 שניות", "Mobile-first"],
    created_at: "2024-09-15",
    featured: true,
  },
  {
    id: "3",
    title: "אוטומציית מכירות בוואטסאפ",
    client: "Scale Commerce Ltd",
    website_url: "https://example.com",
    category: "whatsapp",
    description: "מערכת אוטומציה מקצה לקצה בוואטסאפ: מלכידת לידים ועד סגירת עסקה. מעבד 500+ שיחות ביום ללא התערבות אנושית.",
    full_description: "צינור אוטומציית וואטסאפ שמטפל במשפך המכירות כולו באופן עצמאי — מסיוק ועד רכישה.",
    tags: ["WhatsApp Business API", "אוטומציה", "CRM"],
    preview_image: "",
    results: ["500+ שיחות ביום", "סגירה 32% ללא מגע", "ROI תוך 30 יום"],
    created_at: "2024-08-10",
    featured: true,
  },
  {
    id: "4",
    title: "מערכת ניהול מרפאה רפואית",
    client: "Tel Aviv Medical Group",
    website_url: "https://example.com",
    category: "crm",
    description: "מערכת ניהול מטופלים מלאה עם הזמנת תורים, תזכורות אוטומטיות ואישורים בוואטסאפ.",
    full_description: "פלטפורמת ניהול מאוחדת לקבוצה רפואית. מטופלים מזמינים אונליין, מקבלים תזכורות בוואטסאפ, אי-הגעות ירדו ב-60%.",
    tags: ["CRM", "תזכורות וואטסאפ", "לוח בקרה"],
    preview_image: "",
    results: ["אי-הגעות -60%", "יעילות צוות +45%", "שביעות רצון 9.4/10"],
    created_at: "2024-07-20",
    featured: true,
  },
  {
    id: "5",
    title: "מיתוג ונוכחות אי-קומרס",
    client: "Urban Thread Co.",
    website_url: "https://example.com",
    category: "digital-presence",
    description: "נוכחות דיגיטלית מלאה לסטארטאפ אופנה — אתר, רשתות חברתיות, קטלוג וואטסאפ ו-SEO מיסודי.",
    full_description: "לקחנו סטארטאפ אופנה מאפס לנוכחות דיגיטלית פעילה מלאה תוך 3 שבועות.",
    tags: ["אי-קומרס", "SEO", "מסחר חברתי"],
    preview_image: "",
    results: ["0 ← 10K מבקרים/חודש", "מכירה ראשונה תוך 48ש", "עמוד 1 בגוגל תוך 6 שבועות"],
    created_at: "2024-06-05",
    featured: true,
  },
  {
    id: "6",
    title: "מכונת לידים B2B",
    client: "Apex Industrial Solutions",
    website_url: "https://example.com",
    category: "automation",
    description: "צינור לידים אוטומטי B2B: דפי נחיתה, סיוק בוואטסאפ וסנכרון CRM. משפך מלא בטייס אוטומטי.",
    full_description: "מכונת יצירת לידים B2B — פוטנציאל לקוחות נוחתים בדפים ממוטבים ונכנסים לרצף סיוק אוטומטי.",
    tags: ["יצירת לידים", "B2B", "סנכרון CRM"],
    preview_image: "",
    results: ["120 לידים מוסיקים/חודש", "עלות לליד -65%", "מחזור מכירות -40%"],
    created_at: "2024-05-12",
    featured: true,
  },
  {
    id: "7",
    title: "אתר משרד עורכי דין",
    client: "Cohen & Partners Law",
    website_url: "https://example.com",
    category: "website",
    description: "אתר יוקרתי למשרד עורכי דין עם מערכת פגישות, שאלון לקוח אוטומטי ולכידת לידים בוואטסאפ.",
    full_description: "אתר מקצועי עם לכידת לידים חכמה — כל פנייה נכנסת לוואטסאפ ומוסיקת אוטומטית.",
    tags: ["Next.js", "לכידת לידים", "WhatsApp"],
    preview_image: "",
    results: ["פניות חדשות +180%", "זמן תגובה ללקוח -80%", "Lighthouse 98"],
    created_at: "2024-04-08",
    featured: true,
  },
  {
    id: "8",
    title: "CRM לסוכנות רכב",
    client: "Drive Elite Motors",
    website_url: "https://example.com",
    category: "crm",
    description: "מערכת CRM מותאמת לסוכנות רכב: מעקב לידים, תזכורות טסט-דרייב, ורצף המרה בוואטסאפ.",
    full_description: "פיתחנו CRM ייעודי לסוכנות רכב — כל ליד עובר רצף וואטסאפ שמוביל לפגישה ולמכירה.",
    tags: ["CRM", "WhatsApp API", "אוטומציה"],
    preview_image: "",
    results: ["סגירות +55%", "תורי טסט-דרייב +90%", "ROI תוך 45 יום"],
    created_at: "2024-03-20",
    featured: true,
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectById = (id: string) => projects.find((p) => p.id === id);
export const getProjectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);

// ── Supabase DB helpers ──────────────────────────────────────────────────────

/** Build a public Supabase Storage URL from a stored path. */
export function getStorageImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return "";
  return `${base}/storage/v1/object/public/previews/${path}`;
}

/** Convert a Supabase DB row to the Project shape used by UI components. */
export function dbProjectToProject(row: {
  id: string;
  title: string;
  client: string | null;
  website_url: string;
  category: string | null;
  description: string | null;
  full_description: string | null;
  tags: string[] | null;
  preview_image_path: string | null;
  results: string[] | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}): Project {
  return {
    id: row.id,
    title: row.title,
    client: row.client ?? "",
    website_url: row.website_url,
    category: (row.category as ProjectCategory) ?? "website",
    description: row.description ?? "",
    full_description: row.full_description ?? undefined,
    tags: row.tags ?? [],
    preview_image: getStorageImageUrl(row.preview_image_path),
    results: row.results ?? undefined,
    created_at: row.created_at,
    featured: row.is_featured,
  };
}
