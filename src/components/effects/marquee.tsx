import type { CSSProperties } from "react";

type MarqueeProps = {
  items: readonly string[];
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
};

// Infinite CSS marquee. Items are rendered twice and the track slides by -50% for a seamless loop.
// Pauses on hover; stops entirely for reduced-motion users (see globals.css).
export function Marquee({ items, reverse = false, duration = 45 }: MarqueeProps) {
  return (
    <div className="marquee relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <ul
        className={`marquee-track flex w-max shrink-0 gap-3 pr-3 ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--duration": `${duration}s` } as CSSProperties}
      >
        {[...items, ...items].map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length ? true : undefined}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-border bg-surface/70 px-4 py-2 text-sm font-medium text-foreground/85 backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
