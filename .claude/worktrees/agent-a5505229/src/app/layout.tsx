import { Geist, Geist_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import { AccessibilityToolbar } from "@/components/accessibility/accessibility-toolbar";
import { CookieBanner } from "@/components/cookie-banner";
import { GlobalBackground } from "@/components/global-background";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "פייטרס בילדרס — סוכנות דיגיטלית",
    template: "%s | פייטרס בילדרס",
  },
  description:
    "פייטרס בילדרס היא סוכנות דיגיטלית פרמיום שנבנתה על ידי לוחמי קרב ישראלים. אנחנו בונים אתרים, מערכות וואטסאפ, פתרונות CRM וכלי אוטומציה שעוזרים לעסקים לצמוח בדיוק צבאי.",
  keywords: [
    "סוכנות דיגיטלית",
    "פיתוח אתרים",
    "אוטומציית וואטסאפ",
    "אינטגרציית CRM",
    "מעקב לידים",
    "אוטומציה עסקית",
    "פייטרס בילדרס",
    "ישראל",
  ],
  authors: [{ name: "פייטרס בילדרס" }],
  creator: "פייטרס בילדרס",
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "פייטרס בילדרס",
    title: "פייטרס בילדרס — סוכנות דיגיטלית",
    description:
      "נבנה על ידי לוחמי קרב. מהונדס לצמיחה. מערכות דיגיטליות פרמיום לעסקים שמתכוונים ברצינות.",
  },
  twitter: {
    card: "summary_large_image",
    title: "פייטרס בילדרס — סוכנות דיגיטלית",
    description:
      "נבנה על ידי לוחמי קרב. מהונדס לצמיחה. מערכות דיגיטליות פרמיום לעסקים שמתכוונים ברצינות.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fighters Builders",
  description:
    "Premium digital agency specializing in websites, automation, CRM, and WhatsApp systems",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://fightersbuilders.com",
  logo: `${process.env.NEXT_PUBLIC_APP_URL || "https://fightersbuilders.com"}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hebrew"],
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} antialiased`}
        suppressHydrationWarning
      >
        <GlobalBackground />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <Toaster richColors position="top-right" />
          <AccessibilityToolbar />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
