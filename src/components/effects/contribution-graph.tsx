"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ContributionDay } from "@/lib/github";

const levelStyles = [
  "color-mix(in srgb, var(--foreground) 7%, transparent)",
  "color-mix(in srgb, var(--accent) 30%, transparent)",
  "color-mix(in srgb, var(--accent) 52%, transparent)",
  "color-mix(in srgb, var(--accent) 76%, transparent)",
  "var(--accent)",
];

const monthFormat = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });
const dayFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function label(day: ContributionDay) {
  const when = dayFormat.format(new Date(`${day.date}T00:00:00Z`));
  return `${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} on ${when}`;
}

// GitHub-style heatmap. Columns sweep in left to right when scrolled into view.
export function ContributionGraph({ weeks }: { weeks: ContributionDay[][] }) {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-x-auto pb-2 [direction:rtl]">
      {/* rtl scroll container keeps the most recent weeks visible on small screens */}
      <div className="inline-flex flex-col gap-2 [direction:ltr]">
        <div className="flex gap-[3px] pl-0 text-[10px] text-muted" aria-hidden="true">
          {weeks.map((week, index) => {
            const first = week[0];
            const month = first ? monthFormat.format(new Date(`${first.date}T00:00:00Z`)) : "";
            const prev = weeks[index - 1]?.[0];
            const showMonth =
              index === 0 || (prev && monthFormat.format(new Date(`${prev.date}T00:00:00Z`)) !== month);
            return (
              <span key={first?.date ?? index} className="w-[11px] shrink-0 overflow-visible whitespace-nowrap">
                {showMonth && index < weeks.length - 2 ? month : ""}
              </span>
            );
          })}
        </div>
        <div className="flex gap-[3px]" role="img" aria-label="GitHub contribution calendar for the last year">
          {weeks.map((week, index) => (
            <motion.div
              key={week[0]?.date ?? index}
              className="flex flex-col gap-[3px]"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.012 }}
            >
              {week.map((day) => (
                <span
                  key={day.date}
                  title={label(day)}
                  className="size-[11px] rounded-[3px]"
                  style={{ background: levelStyles[day.level] }}
                />
              ))}
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-1.5 text-[11px] text-muted" aria-hidden="true">
          Less
          {levelStyles.map((background) => (
            <span key={background} className="size-[11px] rounded-[3px]" style={{ background }} />
          ))}
          More
        </div>
      </div>
    </div>
  );
}
