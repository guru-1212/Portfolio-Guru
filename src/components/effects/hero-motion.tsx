"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

// First name rises in letter by letter; last name slides up as one gradient block
// (background-clip: text doesn't survive per-letter transforms, so it animates whole).
export function HeroName({ first, last }: { first: string; last: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <>
        <span className="block">{first}</span>
        <span className="gradient-text block pb-2">{last}</span>
      </>
    );
  }

  return (
    <>
      <span className="sr-only">
        {first} {last}
      </span>
      <span aria-hidden="true" className="block overflow-hidden pb-1">
        {Array.from(first).map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            initial={{ y: "110%", rotate: 10, opacity: 0 }}
            animate={{ y: "0%", rotate: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.15 + index * 0.045, ease }}
          >
            {char}
          </motion.span>
        ))}
      </span>
      <span aria-hidden="true" className="block overflow-hidden pb-3">
        <motion.span
          className="gradient-text inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
        >
          {last}
        </motion.span>
      </span>
    </>
  );
}

// Glassy tech chip that bobs gently next to the portrait.
export function FloatingBadge({
  label,
  className = "",
  delay = 0,
}: {
  label: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`absolute z-10 flex items-center gap-2 rounded-full border border-border bg-background/75 px-3.5 py-2 text-xs font-semibold shadow-xl backdrop-blur-xl sm:text-sm ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
      animate={
        reduce
          ? undefined
          : { opacity: 1, scale: 1, y: [0, -10, 0] }
      }
      transition={
        reduce
          ? undefined
          : {
              opacity: { duration: 0.5, delay: 1 + delay * 0.25 },
              scale: { duration: 0.5, delay: 1 + delay * 0.25, type: "spring", stiffness: 260, damping: 18 },
              y: { duration: 4 + delay * 0.4, repeat: Infinity, ease: "easeInOut", delay },
            }
      }
    >
      <span className="size-2 rounded-full bg-gradient-to-r from-accent to-accent-2" />
      {label}
    </motion.span>
  );
}
