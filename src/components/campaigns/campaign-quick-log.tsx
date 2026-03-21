"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, MessageSquare, Target, TrendingUp, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  campaignId: string;
}

type EventType = "sent" | "replied" | "lead" | "sale";

const EVENTS: {
  type: EventType;
  label: string;
  successLabel: string;
  icon: typeof Send;
  color: string;
}[] = [
  {
    type: "sent",
    label: "+שליחה",
    successLabel: "נוסף!",
    icon: Send,
    color:
      "text-white/60 bg-white/[0.05] border-white/[0.1] hover:border-white/[0.2]",
  },
  {
    type: "replied",
    label: "+תגובה",
    successLabel: "נוסף!",
    icon: MessageSquare,
    color:
      "text-purple-400 bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40",
  },
  {
    type: "lead",
    label: "+ליד",
    successLabel: "נוסף!",
    icon: Target,
    color:
      "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40",
  },
  {
    type: "sale",
    label: "+מכירה",
    successLabel: "נוסף!",
    icon: TrendingUp,
    color:
      "text-amber-400 bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40",
  },
];

export function CampaignQuickLog({ campaignId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<EventType | null>(null);
  const [lastAdded, setLastAdded] = useState<string>("");

  const log = async (eventType: EventType) => {
    setLoading(eventType);
    const supabase = createClient();
    await supabase.from("campaign_events").insert({
      campaign_id: campaignId,
      event_type: eventType,
      source: "manual",
    });
    setLastAdded(eventType);
    setLoading(null);
    router.refresh();
    setTimeout(() => setLastAdded(""), 2000);
  };

  return (
    <div className="p-5 rounded-xl border border-white/[0.07] bg-[#0d0d18]">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-4">
        הוספת אירוע מהירה
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {EVENTS.map(({ type, label, successLabel, icon: Icon, color }) => (
          <button
            key={type}
            onClick={() => void log(type)}
            disabled={loading !== null}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all disabled:opacity-40 ${color}`}
          >
            {loading === type ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Icon className="w-4 h-4" />
            )}
            {lastAdded === type ? successLabel : label}
          </button>
        ))}
      </div>
    </div>
  );
}
