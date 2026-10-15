import { profile } from "@/data/portfolio";

// First-visit "GT" reveal: the monogram draws itself, fills with the brand gradient,
// then the curtain lifts. Pure CSS — it's hidden unless the head script adds .intro-play
// to <html> (once per session, home page only, never with reduced motion).
export function IntroOverlay() {
  return (
    <div
      aria-hidden="true"
      className="intro fixed inset-0 z-[80] h-[100dvh] flex-col items-center justify-center gap-5 overflow-hidden bg-background px-6 text-center sm:gap-6"
    >
      <svg viewBox="0 0 200 120" className="w-[min(62vw,18rem)]">
        <defs>
          <linearGradient id="intro-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--accent)" }} />
            <stop offset="55%" style={{ stopColor: "var(--accent-2)" }} />
            <stop offset="100%" style={{ stopColor: "var(--accent-3)" }} />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="54%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="intro-fill font-display"
          fontSize="96"
          fontWeight="700"
          fill="url(#intro-gradient)"
        >
          {profile.initials}
        </text>
        <text
          x="50%"
          y="54%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="intro-stroke font-display"
          fontSize="96"
          fontWeight="700"
          fill="none"
          stroke="url(#intro-gradient)"
          strokeWidth="1.6"
        >
          {profile.initials}
        </text>
      </svg>
      {/* Letter-spacing also adds space after the last letter; the matching left padding re-centres it. */}
      <p className="intro-name pl-[0.3em] font-display text-xs uppercase tracking-[0.3em] text-muted sm:pl-[0.45em] sm:text-sm sm:tracking-[0.45em]">
        {profile.name}
      </p>
      <div className="h-px w-32 overflow-hidden rounded-full bg-border sm:w-40">
        <div className="intro-bar h-full w-full bg-gradient-to-r from-accent via-accent-2 to-accent-3" />
      </div>
    </div>
  );
}
