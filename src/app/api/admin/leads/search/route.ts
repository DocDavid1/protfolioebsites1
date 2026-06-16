import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { scoreBusinessLead } from "@/lib/lead-scoring";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";
import { classifyWebPresence } from "@/lib/web-presence";

export const dynamic = "force-dynamic";

const searchSchema = z.object({
  query: z.string().min(1).max(200),
  city: z.string().max(100).optional(),
  country: z.string().max(10).default("IL"),
  radius: z.number().min(100).max(50000).default(5000),
  save: z.boolean().default(false),
});

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  return profile?.is_admin ? user : null;
}

export async function POST(req: NextRequest) {
  const adminUser = await requireAdmin();
  if (!adminUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = searchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 422 });
  }

  const { query, city, country, radius, save } = parsed.data;

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Places API key not configured. Set GOOGLE_PLACES_API_KEY in env." },
      { status: 503 }
    );
  }

  // Build the text search string
  const textQuery = city ? `${query} in ${city}` : query;

  // Google Places API (New) — Text Search
  const url = "https://places.googleapis.com/v1/places:searchText";
  const gBody = {
    textQuery,
    locationBias: {
      circle: {
        radius,
        center: { latitude: 31.7683, longitude: 35.2137 }, // Israel center default
      },
    },
    maxResultCount: 20,
    languageCode: "iw",
  };

  let places: GooglePlace[];
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.primaryTypeDisplayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri,places.businessStatus",
      },
      body: JSON.stringify(gBody),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("[places] API error:", errText);
      return NextResponse.json(
        { error: `Google Places API error (${resp.status}): ${errText}` },
        { status: 502 }
      );
    }

    const data = (await resp.json()) as { places?: GooglePlace[] };
    places = data.places ?? [];
  } catch (e) {
    console.error("[places] fetch error:", e);
    return NextResponse.json({ error: "Failed to reach Google Places API." }, { status: 502 });
  }

  // Map to our lead shape + score
  const results = places.map((p) => {
    const presence = classifyWebPresence(p.websiteUri);
    const hasWebsite = presence.type === "website";
    const scoring = scoreBusinessLead({
      has_website: hasWebsite,
      website_url: p.websiteUri ?? null,
      google_rating: p.rating ?? null,
      review_count: p.userRatingCount ?? null,
    });

    if (presence.type === "facebook" || presence.type === "instagram") {
      scoring.reasons.unshift(
        presence.type === "facebook"
          ? "יש להם רק עמוד פייסבוק — אין אתר משלהם"
          : "יש להם רק עמוד אינסטגרם — אין אתר משלהם"
      );
    }

    return {
      place_id: p.id,
      name: p.displayName?.text ?? "—",
      category: p.primaryTypeDisplayName?.text ?? null,
      address: p.formattedAddress ?? null,
      city: city ?? null,
      country,
      phone: p.nationalPhoneNumber ?? null,
      website: p.websiteUri ?? null,
      google_maps_url: p.googleMapsUri ?? null,
      has_website: hasWebsite,
      google_rating: p.rating ?? null,
      review_count: p.userRatingCount ?? null,
      score: scoring.score,
      score_reasons: scoring.reasons,
      search_query: textQuery,
    };
  });

  // Optionally save to database
  if (save && results.length > 0) {
    const adminSupabase = await createAdminClient();
    const { error: insertError } = await adminSupabase
      .from("business_leads")
      .upsert(
        results.map((r) => ({ ...r, status: "new" as const })),
        { onConflict: "place_id", ignoreDuplicates: true }
      );

    if (insertError) {
      console.error("[leads/search] upsert error:", insertError.message);
    }
  }

  return NextResponse.json({ results, total: results.length });
}

interface GooglePlace {
  id: string;
  displayName?: { text: string; languageCode?: string };
  primaryTypeDisplayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  businessStatus?: string;
}
