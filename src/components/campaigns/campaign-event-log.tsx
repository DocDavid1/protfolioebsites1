"use client";

interface EventRow {
  id: string;
  event_type: string;
  contact_name: string | null;
  contact_phone: string | null;
  source: string | null;
  occurred_at: string;
}

interface Props {
  events: EventRow[];
}

const EVENT_LABELS: Record<string, string> = {
  sent: "נשלח",
  delivered: "נמסר",
  read: "נקרא",
  replied: "ענה",
  lead: "ליד",
  sale: "מכירה",
  unsubscribe: "הסרה",
};

const EVENT_COLORS: Record<string, string> = {
  sent: "text-gray-500 dark:text-white/50",
  delivered: "text-blue-400",
  read: "text-purple-400",
  replied: "text-purple-400",
  lead: "text-emerald-400",
  sale: "text-amber-400",
  unsubscribe: "text-red-400",
};

/** Format an ISO date string to a short Hebrew locale date+time */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function CampaignEventLog({ events }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-[#0d0d18] overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200/60 dark:border-white/[0.05] flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-300 dark:text-white/25">
          יומן אירועים
        </p>
        <span className="text-xs text-gray-300 dark:text-white/20">{events.length} אירועים</span>
      </div>

      {events.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-300 dark:text-white/20 text-sm">
            אין אירועים עדיין. השתמש בכפתורים למעלה להוספה.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.03]">
          {events.map((e) => (
            <div
              key={e.id}
              className="px-5 py-3 flex items-center gap-4 hover:bg-white/[0.01] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <span
                  className={`text-sm font-medium ${EVENT_COLORS[e.event_type] ?? "text-gray-500 dark:text-white/50"}`}
                >
                  {EVENT_LABELS[e.event_type] ?? e.event_type}
                </span>
                {e.contact_name && (
                  <span className="text-xs text-gray-400 dark:text-white/30 mr-2">
                    &mdash; {e.contact_name}
                  </span>
                )}
                {e.contact_phone && (
                  <span className="text-xs text-gray-300 dark:text-white/20 mr-1" dir="ltr">
                    {e.contact_phone}
                  </span>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-gray-300 dark:text-white/20">
                  {formatDate(e.occurred_at)}
                </p>
                {e.source && e.source !== "manual" && (
                  <p className="text-[10px] text-white/15 mt-0.5">
                    {e.source}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
