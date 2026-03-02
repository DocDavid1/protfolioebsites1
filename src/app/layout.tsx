import { Geist, Geist_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
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
    default: "Fighters Builders — Digital Agency",
    template: "%s | Fighters Builders",
  },
  description:
    "Fighters Builders is a premium digital agency built by Israeli combat veterans. We build websites, WhatsApp systems, CRM solutions, and automation tools that help businesses grow with military precision.",
  keywords: [
    "digital agency",
    "web development",
    "WhatsApp automation",
    "CRM integration",
    "lead tracking",
    "business automation",
    "Fighters Builders",
    "Israel",
  ],
  authors: [{ name: "Fighters Builders" }],
  creator: "Fighters Builders",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Fighters Builders",
    title: "Fighters Builders — Digital Agency",
    description:
      "Built by combat veterans. Engineered for growth. Premium digital systems for businesses that mean business.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fighters Builders — Digital Agency",
    description:
      "Built by combat veterans. Engineered for growth. Premium digital systems for businesses that mean business.",
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
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} antialiased`}
      >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
