// The first-visit intro overlay (see IntroOverlay + the head script in layout.tsx) sets
// <html class="intro-play"> while it runs. Hero animations add this delay so they start
// as the overlay lifts instead of playing hidden underneath it.
export const INTRO_DURATION_S = 1.55;

export function introDelay(): number {
  if (typeof document === "undefined") return 0;
  return document.documentElement.classList.contains("intro-play") ? INTRO_DURATION_S : 0;
}
