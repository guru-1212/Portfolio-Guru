"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { introDelay } from "@/lib/intro";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Animate on mount instead of when scrolled into view (use for above-the-fold content). */
  immediate?: boolean;
  /** Start blurred and sharpen into focus — reserve for headings, it's heavier to animate. */
  blur?: boolean;
  /** Direction the content slides in from. */
  from?: "bottom" | "left" | "right";
};

const offsets = { bottom: { x: 0, y: 28 }, left: { x: -36, y: 0 }, right: { x: 36, y: 0 } };

// Fades and slides content in. Skipped entirely for users who prefer reduced motion.
export function Reveal({
  children,
  delay = 0,
  className,
  immediate = false,
  blur = false,
  from = "bottom",
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const hidden = { opacity: 0, ...offsets[from], ...(blur ? { filter: "blur(10px)" } : {}) };
  const shown = { opacity: 1, x: 0, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) };
  // Above-the-fold content waits for the first-visit intro to finish.
  const transition = {
    duration: 0.7,
    delay: delay + (immediate ? introDelay() : 0),
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return immediate ? (
    <motion.div className={className} initial={hidden} animate={shown} transition={transition}>
      {children}
    </motion.div>
  ) : (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "-70px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
