/**
 * Central business configuration.
 * All values come from environment variables with sensible defaults.
 * Set these in .env.local for development and in Vercel for production.
 */

export const BUSINESS = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Fighters Builders",
  nameHe: process.env.NEXT_PUBLIC_BUSINESS_NAME_HE ?? "פייטרס בילדרס",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "hello@fightersbuilders.com",
  privacyEmail:
    process.env.NEXT_PUBLIC_PRIVACY_EMAIL ??
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL ??
    "privacy@fightersbuilders.com",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "+972-50-000-0000",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "972500000000",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? "ישראל",
  registration: process.env.NEXT_PUBLIC_BUSINESS_REGISTRATION ?? "",
  privacyOfficer:
    process.env.NEXT_PUBLIC_PRIVACY_OFFICER ?? "מנהל הפרטיות",
  url:
    process.env.NEXT_PUBLIC_APP_URL ??
    (typeof window !== "undefined" ? window.location.origin : "https://fightersbuilders.com"),
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
