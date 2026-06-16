/**
 * Classifies a business's "website" URL as a real website vs. a social media
 * page. Many small businesses list a Facebook/Instagram page as their Google
 * Maps "website" instead of having a real site — this matters for sales:
 * it's a different (weaker) pitch than a business with zero online presence.
 */
export type WebPresenceType = "website" | "facebook" | "instagram" | "none";

export interface WebPresence {
  type: WebPresenceType;
  label: string;
  url: string | null;
}

export function classifyWebPresence(url: string | null | undefined): WebPresence {
  if (!url) return { type: "none", label: "ללא נוכחות מקוונת", url: null };

  let hostname = "";
  try {
    hostname = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return { type: "website", label: url, url };
  }

  if (hostname === "facebook.com" || hostname.endsWith(".facebook.com") || hostname === "fb.com") {
    return { type: "facebook", label: "עמוד פייסבוק", url };
  }
  if (hostname === "instagram.com" || hostname.endsWith(".instagram.com")) {
    return { type: "instagram", label: "עמוד אינסטגרם", url };
  }
  return { type: "website", label: hostname, url };
}
