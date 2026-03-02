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
        "rounded-lg overflow-hidden border border-white/10 shadow-2xl",
        className
      )}
    >
      {/* Browser chrome */}
      <div className="bg-[#1a1a2e] border-b border-white/10 px-3 py-2 flex items-center gap-2">
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

// Placeholder component when no image is available
export function BrowserWindowPlaceholder({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden border border-white/10 shadow-2xl",
        className
      )}
    >
      <div className="bg-[#1a1a2e] border-b border-white/10 px-3 py-2 flex items-center gap-2">
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
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(to right, rgba(59,130,246,0.3) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative text-center space-y-2">
          <div className="w-8 h-8 mx-auto rounded border border-white/10 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
              />
            </svg>
          </div>
          <p className="text-[10px] text-white/20 font-mono">{title}</p>
        </div>
      </div>
    </div>
  );
}
