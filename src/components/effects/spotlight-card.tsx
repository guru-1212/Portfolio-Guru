"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Adds a subtle 3D tilt toward the mouse. */
  tilt?: boolean;
};

// Card whose border and surface light up where the pointer is (styles in globals.css → .spotlight).
export function SpotlightCard({ children, className = "", tilt = false }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 160, damping: 18 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);
    if (tilt && !reduce && event.pointerType === "mouse") {
      rotateY.set((px / rect.width - 0.5) * 8);
      rotateX.set(-(py / rect.height - 0.5) * 8);
    }
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      className={`spotlight ${className}`}
    >
      {children}
    </motion.div>
  );
}
