/**
 * Lead scoring engine.
 * Scores a business from 0–100 based on how likely they need digital services.
 * Higher score = more likely to need help = higher priority lead.
 */

export interface ScoringInput {
  has_website: boolean;
  website_url?: string | null;
  google_rating?: number | null;
  review_count?: number | null;
  audit?: {
    is_https?: boolean | null;
    mobile_friendly?: boolean | null;
    has_cta?: boolean | null;
    has_contact_form?: boolean | null;
    page_title?: string | null;
    meta_description?: string | null;
    load_speed_ms?: number | null;
    social_links?: string[] | null;
  } | null;
}

export interface ScoringResult {
  score: number;
  reasons: string[];
}

export function scoreBusinessLead(input: ScoringInput): ScoringResult {
  let score = 50; // neutral baseline
  const reasons: string[] = [];

  // ── Website presence ─────────────────────────────────────
  if (!input.has_website) {
    score += 30;
    reasons.push("אין אתר אינטרנט");
  } else {
    // Has a website — check its quality
    if (input.audit) {
      const a = input.audit;

      if (a.is_https === false) {
        score += 15;
        reasons.push("אין SSL — האתר לא מאובטח");
      }

      if (a.mobile_friendly === false) {
        score += 12;
        reasons.push("האתר לא ידידותי למובייל");
      }

      if (!a.has_cta) {
        score += 8;
        reasons.push("אין קריאה לפעולה (CTA) ברורה");
      }

      if (!a.has_contact_form) {
        score += 5;
        reasons.push("אין טופס יצירת קשר");
      }

      if (!a.page_title || a.page_title.length < 10) {
        score += 6;
        reasons.push("כותרת SEO חסרה או חלשה");
      }

      if (!a.meta_description || a.meta_description.length < 30) {
        score += 5;
        reasons.push("תיאור מטא SEO חסר");
      }

      if (a.load_speed_ms && a.load_speed_ms > 3000) {
        score += 8;
        reasons.push("טעינת אתר איטית (מעל 3 שניות)");
      }

      if (!a.social_links || a.social_links.length === 0) {
        score += 5;
        reasons.push("אין קישורים לרשתות חברתיות");
      }
    }
  }

  // ── Google reputation ────────────────────────────────────
  if (input.google_rating !== null && input.google_rating !== undefined) {
    if (input.google_rating < 3.5) {
      score += 15;
      reasons.push(`דירוג גוגל נמוך (${input.google_rating}★) — ניהול מוניטין נדרש`);
    } else if (input.google_rating < 4.0) {
      score += 8;
      reasons.push(`דירוג גוגל בינוני (${input.google_rating}★) — יש מקום לשיפור`);
    }
  } else {
    score += 10;
    reasons.push("אין עסק מאומת בגוגל");
  }

  if (input.review_count !== null && input.review_count !== undefined) {
    if (input.review_count < 10) {
      score += 10;
      reasons.push(`מעט ביקורות (${input.review_count}) — בניית מוניטין נדרשת`);
    } else if (input.review_count < 30) {
      score += 5;
      reasons.push(`מספר ביקורות נמוך (${input.review_count})`);
    }
  }

  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    reasons,
  };
}
