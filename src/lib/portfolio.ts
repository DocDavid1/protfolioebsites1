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
  full_description?: string;
  tags: string[];
  preview_image: string;
  results?: string[];
  created_at: string;
  featured?: boolean;
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  website: "Website",
  automation: "Automation",
  crm: "CRM System",
  whatsapp: "WhatsApp",
  "digital-presence": "Digital Presence",
  "full-system": "Full System",
};

export const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  website: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  automation: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  crm: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  whatsapp: "text-green-400 bg-green-400/10 border-green-400/20",
  "digital-presence": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "full-system": "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

// Mock portfolio data — replace with real projects
export const projects: Project[] = [
  {
    id: "1",
    title: "Luxury Real Estate Platform",
    client: "Premium Realty Group",
    website_url: "https://example.com",
    category: "full-system",
    description:
      "Full-stack real estate platform with WhatsApp lead capture, automated follow-ups, and CRM integration. Reduced lead response time from 24h to under 3 minutes.",
    full_description:
      "We built a complete digital presence for a luxury real estate group — combining a high-end property showcase website with a WhatsApp automation system that captures leads 24/7. Every inquiry triggers an instant WhatsApp response, qualifies the prospect, and routes them to the right agent.",
    tags: ["Next.js", "WhatsApp API", "CRM", "Automation"],
    preview_image: "/previews/real-estate.jpg",
    results: [
      "3x increase in qualified leads",
      "Response time: 24h → 3 minutes",
      "40% conversion improvement",
    ],
    created_at: "2024-11-01",
    featured: true,
  },
  {
    id: "2",
    title: "Restaurant Chain Digital Hub",
    client: "Grill Masters Group",
    website_url: "https://example.com",
    category: "website",
    description:
      "Multi-location restaurant website with online ordering, reservation system, and digital menu management. Built for speed and conversion.",
    full_description:
      "A high-performance website for a restaurant chain with 8 locations. Includes real-time table reservations, online ordering with WhatsApp order confirmations, and a CMS-driven menu system that managers can update without developers.",
    tags: ["Next.js", "Reservation System", "Online Ordering", "SEO"],
    preview_image: "/previews/restaurant.jpg",
    results: [
      "Online reservations up 200%",
      "Page load under 1.2 seconds",
      "Mobile-first design",
    ],
    created_at: "2024-09-15",
    featured: true,
  },
  {
    id: "3",
    title: "WhatsApp Sales Automation",
    client: "Scale Commerce Ltd",
    website_url: "https://example.com",
    category: "whatsapp",
    description:
      "End-to-end WhatsApp Business automation system: from lead capture to deal closure. Processes 500+ conversations daily without human intervention.",
    full_description:
      "A sophisticated WhatsApp automation pipeline that handles the entire sales funnel autonomously. Prospects are engaged, qualified, presented with offers, and guided to purchase — all through WhatsApp, all automated.",
    tags: ["WhatsApp Business API", "Automation", "Lead Qualification", "CRM"],
    preview_image: "/previews/whatsapp.jpg",
    results: [
      "500+ daily automated conversations",
      "32% close rate without human touch",
      "ROI positive within 30 days",
    ],
    created_at: "2024-08-10",
    featured: false,
  },
  {
    id: "4",
    title: "Medical Clinic Management System",
    client: "Tel Aviv Medical Group",
    website_url: "https://example.com",
    category: "crm",
    description:
      "Complete patient management system with appointment booking, automated reminders, WhatsApp confirmations, and staff dashboard.",
    full_description:
      "We built a unified management platform for a medical group. Patients book online, receive automated WhatsApp reminders, and staff manage everything from a single dashboard. No-shows dropped by 60%.",
    tags: ["CRM", "Scheduling", "WhatsApp Reminders", "Dashboard"],
    preview_image: "/previews/medical.jpg",
    results: [
      "60% reduction in no-shows",
      "Staff efficiency +45%",
      "Patient satisfaction score 9.4/10",
    ],
    created_at: "2024-07-20",
    featured: true,
  },
  {
    id: "5",
    title: "E-commerce Brand Launchpad",
    client: "Urban Thread Co.",
    website_url: "https://example.com",
    category: "digital-presence",
    description:
      "Brand-new digital presence for a fashion startup — website, social strategy, WhatsApp catalog, and SEO foundation built for rapid growth.",
    full_description:
      "We took a fashion startup from zero to fully operational digital presence in 3 weeks. Complete brand identity online, product catalog, Instagram-connected shopping, and WhatsApp order processing.",
    tags: ["E-commerce", "Brand Identity", "SEO", "Social Commerce"],
    preview_image: "/previews/ecommerce.jpg",
    results: [
      "0 to 10,000 monthly visitors in 60 days",
      "First sale within 48 hours of launch",
      "Google page 1 in 6 weeks",
    ],
    created_at: "2024-06-05",
    featured: false,
  },
  {
    id: "6",
    title: "B2B Lead Capture System",
    client: "Apex Industrial Solutions",
    website_url: "https://example.com",
    category: "automation",
    description:
      "Automated B2B lead pipeline: LinkedIn targeting, landing pages, WhatsApp qualification, and CRM sync. Full funnel on autopilot.",
    full_description:
      "A complete B2B lead generation machine. Qualified prospects land on optimized pages, fill a form, and immediately enter an automated WhatsApp qualification sequence. Qualified leads are synced to CRM and assigned to sales reps.",
    tags: ["Lead Generation", "B2B", "Automation", "CRM Sync"],
    preview_image: "/previews/b2b.jpg",
    results: [
      "120 qualified leads per month",
      "Cost per qualified lead down 65%",
      "Sales cycle shortened 40%",
    ],
    created_at: "2024-05-12",
    featured: false,
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectById = (id: string) => projects.find((p) => p.id === id);
export const getProjectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);
