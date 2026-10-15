import { profile } from "@/data/portfolio";

// First-visit "GT" reveal: the monogram draws itself, fills with the brand gradient,
// then the curtain lifts. Pure CSS — it's hidden unless the head script adds .intro-play
// to <html> (once per session, home page only, never with reduced motion).
export function IntroOverlay() {
  return (
    <div
      aria-hidden="true"
      className="intro fixed inset-0 z-[80] flex-col items-center justify-center gap-6 bg-background"
    >
      <svg viewBox="0 0 200 120" className="w-56 sm:w-72" role="presentation">
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
      <p className="intro-name font-display text-sm uppercase tracking-[0.45em] text-muted">
        {profile.name}
      </p>
      <div className="h-px w-40 overflow-hidden rounded-full bg-border">
        <div className="intro-bar h-full w-full bg-gradient-to-r from-accent via-accent-2 to-accent-3" />
      </div>
    </div>
  );
}
