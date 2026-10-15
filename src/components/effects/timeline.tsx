"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

// Vertical timeline whose gradient line "draws" as you scroll and whose dots light up on arrival.
export function Timeline({ items }: { items: readonly string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative space-y-5 pl-11">
      <span className="absolute bottom-3 left-[13px] top-3 w-px bg-border" aria-hidden="true" />
      <motion.span
        aria-hidden="true"
        style={reduce ? undefined : { scaleY }}
        className="absolute bottom-3 left-[13px] top-3 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3"
      />
      {items.map((item, index) => (
        <motion.li
          key={item}
          className="relative"
          initial={reduce ? false : { opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute -left-11 top-4 flex size-[27px] items-center justify-center rounded-full border border-border bg-background"
            initial={reduce ? false : { scale: 0.4 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
          >
            <span className="size-2.5 rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_14px_var(--accent)]" />
          </motion.span>
          <div className="rounded-2xl border border-border bg-surface/70 p-5 leading-relaxed text-muted backdrop-blur transition-colors hover:border-accent/40 hover:text-foreground/90">
            <span className="mb-1.5 block font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
