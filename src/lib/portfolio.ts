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
    description:
      'פלטפורמת נדל"ן מלאה עם לכידת לידים בוואטסאפ, מעקבים אוטומטיים ואינטגרציית CRM. זמן תגובה ללידים ירד מ-24 שעות לפחות מ-3 דקות.',
    full_description:
      'בנינו נוכחות דיגיטלית מלאה לקבוצת נדל"ן יוקרתית — שילוב של אתר תצוגת נכסים ברמה גבוהה עם מערכת אוטומציית וואטסאפ שלוכדת לידים 24/7. כל פנייה מפעילה מיד תגובת וואטסאפ, מסיקה את הפוטנציאל ומנתבת אותו לסוכן הנכון.',
    tags: ["Next.js", "WhatsApp API", "CRM", "אוטומציה"],
    preview_image: "/previews/real-estate.jpg",
    results: [
      "פי 3 יותר לידים מוסיקים",
      "זמן תגובה: 24 שעות ← 3 דקות",
      "שיפור המרה של 40%",
    ],
    created_at: "2024-11-01",
    featured: true,
  },
  {
    id: "2",
    title: "מרכז דיגיטלי לרשת מסעדות",
    client: "Grill Masters Group",
    website_url: "https://example.com",
    category: "website",
    description:
      "אתר מסעדה רב-סניפי עם הזמנות אונליין, מערכת הזמנת שולחנות וניהול תפריט דיגיטלי. נבנה למהירות ולהמרה.",
    full_description:
      "אתר בעל ביצועים גבוהים לרשת מסעדות עם 8 סניפים. כולל הזמנות שולחן בזמן אמת, הזמנות אונליין עם אישורים בוואטסאפ, ומערכת תפריט מונעת CMS שמנהלים יכולים לעדכן ללא מפתחים.",
    tags: ["Next.js", "מערכת הזמנות", "הזמנות אונליין", "SEO"],
    preview_image: "/previews/restaurant.jpg",
    results: [
      "הזמנות אונליין עלו ב-200%",
      "טעינת עמוד מתחת ל-1.2 שניות",
      "עיצוב mobile-first",
    ],
    created_at: "2024-09-15",
    featured: true,
  },
  {
    id: "3",
    title: "אוטומציית מכירות בוואטסאפ",
    client: "Scale Commerce Ltd",
    website_url: "https://example.com",
    category: "whatsapp",
    description:
      "מערכת אוטומציה מקצה לקצה בוואטסאפ: מלכידת לידים ועד סגירת עסקה. מעבד 500+ שיחות ביום ללא התערבות אנושית.",
    full_description:
      "צינור אוטומציית וואטסאפ מתוחכם שמטפל במשפך המכירות כולו באופן עצמאי. פוטנציאל לקוחות נעסקים, מוסיקים, מוצגים להם הצעות ומובלים לרכישה — הכל דרך וואטסאפ, הכל אוטומטי.",
    tags: ["WhatsApp Business API", "אוטומציה", "סיוק לידים", "CRM"],
    preview_image: "/previews/whatsapp.jpg",
    results: [
      "500+ שיחות אוטומטיות ביום",
      "שיעור סגירה של 32% ללא מגע אנושי",
      "חיובי לROI תוך 30 יום",
    ],
    created_at: "2024-08-10",
    featured: false,
  },
  {
    id: "4",
    title: "מערכת ניהול מרפאה רפואית",
    client: "Tel Aviv Medical Group",
    website_url: "https://example.com",
    category: "crm",
    description:
      "מערכת ניהול מטופלים מלאה עם הזמנת תורים, תזכורות אוטומטיות, אישורים בוואטסאפ ולוח בקרה לצוות.",
    full_description:
      "בנינו פלטפורמת ניהול מאוחדת לקבוצה רפואית. מטופלים מזמינים אונליין, מקבלים תזכורות אוטומטיות בוואטסאפ, והצוות מנהל הכל מלוח בקרה אחד. אי-הגעות ירדו ב-60%.",
    tags: ["CRM", "תיאום", "תזכורות וואטסאפ", "לוח בקרה"],
    preview_image: "/previews/medical.jpg",
    results: [
      "ירידה של 60% באי-הגעות",
      "יעילות הצוות +45%",
      "ציון שביעות רצון מטופלים 9.4/10",
    ],
    created_at: "2024-07-20",
    featured: true,
  },
  {
    id: "5",
    title: "מקפצה למותג אי-קומרס",
    client: "Urban Thread Co.",
    website_url: "https://example.com",
    category: "digital-presence",
    description:
      "נוכחות דיגיטלית חדשה לחלוטין לסטארטאפ אופנה — אתר, אסטרטגיית רשתות חברתיות, קטלוג וואטסאפ ויסוד SEO הבנוי לצמיחה מהירה.",
    full_description:
      "לקחנו סטארטאפ אופנה מאפס לנוכחות דיגיטלית פעילה מלאה תוך 3 שבועות. זהות מותג מלאה אונליין, קטלוג מוצרים, קנייה מחוברת לאינסטגרם ועיבוד הזמנות בוואטסאפ.",
    tags: ["אי-קומרס", "זהות מותג", "SEO", "מסחר חברתי"],
    preview_image: "/previews/ecommerce.jpg",
    results: [
      "מ-0 ל-10,000 מבקרים חודשיים תוך 60 יום",
      "מכירה ראשונה תוך 48 שעות מהשקה",
      "עמוד 1 בגוגל תוך 6 שבועות",
    ],
    created_at: "2024-06-05",
    featured: false,
  },
  {
    id: "6",
    title: "מערכת לכידת לידים B2B",
    client: "Apex Industrial Solutions",
    website_url: "https://example.com",
    category: "automation",
    description:
      "צינור לידים אוטומטי B2B: טרגוט בלינקדאין, דפי נחיתה, סיוק בוואטסאפ וסנכרון CRM. משפך מלא בטייס אוטומטי.",
    full_description:
      "מכונת יצירת לידים B2B מלאה. פוטנציאל לקוחות מוסיקים נוחתים בדפים ממוטבים, ממלאים טופס, ונכנסים מיד לרצף סיוק בוואטסאפ אוטומטי. לידים מוסיקים מסונכרנים ל-CRM ומוקצים לנציגי מכירות.",
    tags: ["יצירת לידים", "B2B", "אוטומציה", "סנכרון CRM"],
    preview_image: "/previews/b2b.jpg",
    results: [
      "120 לידים מוסיקים בחודש",
      "עלות לליד מוסיק ירדה ב-65%",
      "מחזור מכירות קוצר ב-40%",
    ],
    created_at: "2024-05-12",
    featured: false,
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
