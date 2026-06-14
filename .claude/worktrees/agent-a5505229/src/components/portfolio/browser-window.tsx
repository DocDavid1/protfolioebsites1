import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrowserWindowProps {
  url: string;
  title: string;
  imageUrl: string;
  className?: string;
  priority?: boolean;
}

export function BrowserWindow({
  url,
  title,
  imageUrl,
  className,
  priority = false,
}: BrowserWindowProps) {
  // Strip protocol for display
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden window-browser",
        className
      )}
    >
      {/* Browser chrome */}
      <div className="bg-[#16162e] border-b-2 border-white/15 px-3 py-2.5 flex items-center gap-2">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-90" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-90" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-90" />
        </div>

        {/* URL bar */}
        <div className="flex-1 mx-2">
          <div className="flex items-center gap-1.5 bg-[#0d0d18] rounded px-2 py-1 border border-white/5">
            {/* Lock icon */}
            <svg
              className="w-2.5 h-2.5 text-emerald-400 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
            </svg>
            <span className="text-[10px] text-white/40 font-mono truncate">
              {displayUrl}
            </span>
          </div>
        </div>

        {/* Reload icon */}
        <svg
          className="w-3 h-3 text-white/25 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>

      {/* Site preview */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0d18]">
        <Image
          src={imageUrl}
          alt={`Preview of ${title}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          onError={() => {
            // Fallback handled via CSS
          }}
        />
        {/* Overlay for no image fallback */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d18] opacity-0 transition-opacity">
          <span className="text-white/20 text-sm font-mono">preview</span>
        </div>
      </div>
    </div>
  );
}

// Placeholder component — shows real image when available, grid pattern otherwise
export function BrowserWindowPlaceholder({
  url,
  title,
  imageUrl,
  className,
  priority = false,
}: {
  url: string;
  title: string;
  imageUrl?: string | undefined;
  className?: string | undefined;
  priority?: boolean | undefined;
}) {
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden window-browser",
        className
      )}
    >
      <div className="bg-[#16162e] border-b-2 border-white/15 px-3 py-2.5 flex items-center gap-2">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-90" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-90" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-90" />
        </div>
        <div className="flex-1 mx-2">
          <div className="flex items-center gap-1.5 bg-[#0d0d18] rounded px-2 py-1 border border-white/5">
            <svg
              className="w-2.5 h-2.5 text-emerald-400 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
            </svg>
            <span className="text-[10px] text-white/40 font-mono truncate">
              {displayUrl}
            </span>
          </div>
        </div>
      </div>
      <div className="relative aspect-[16/10] bg-[#0d0d18] flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Preview of ${title}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <>
            {/* Gradient atmosphere */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.08) 50%, transparent 80%), linear-gradient(135deg, #0e0e20 0%, #080812 100%)",
              }}
            />
            {/* Subtle dot grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(rgba(59,130,246,0.25) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Glowing orb */}
            <div
              className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full blur-3xl opacity-30"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)" }}
            />
            {/* Title display */}
            <div className="relative text-center px-6 space-y-3">
              <div className="w-10 h-10 mx-auto rounded-xl border border-blue-500/25 bg-blue-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <p className="text-sm font-bold text-white/60 leading-tight">{title}</p>
              <p className="text-[10px] text-white/25 font-mono uppercase tracking-widest">live project</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
