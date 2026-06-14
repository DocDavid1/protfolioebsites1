"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      video.pause();
      return;
    }

    // Ensure playback starts — some mobile browsers need an explicit call
    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked — video remains on first frame (same asset, no swap)
      });
    };

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }
  }, []);

  return (
    // absolute (not fixed) — scoped to the hero section which is relative + overflow-hidden
    // This prevents the video from bleeding through other page sections (root cause of desktop swap)
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        // preload=metadata loads only the first frame on mobile (avoids 37MB download up front)
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center center", filter: "brightness(0.45)" }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay — keeps text readable */}
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,11,0.65) 0%, rgba(5,5,11,0.45) 40%, rgba(5,5,11,0.90) 100%)",
        }}
      />
    </div>
  );
}
