"use client";

export function HeroVideo() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay — keeps text readable while letting the video show through */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,11,0.45) 0%, rgba(5,5,11,0.30) 50%, rgba(5,5,11,0.75) 100%)",
        }}
      />
    </div>
  );
}
