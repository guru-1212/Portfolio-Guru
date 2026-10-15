import { Briefcase, MapPin } from "lucide-react";
import { experience } from "@/data/portfolio";
import { CountUp } from "../effects/count-up";
import { SpotlightCard } from "../effects/spotlight-card";
import { Timeline } from "../effects/timeline";
import { Reveal } from "../reveal";
import { Section } from "../section";

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title={
        <>
          Shipping for airlines, <span className="gradient-text">every sprint.</span>
        </>
      }
    >
      {experience.map((job) => (
        <div key={`${job.company}-${job.period}`} className="grid gap-8 lg:grid-cols-[0.95fr_1.4fr] lg:gap-12">
          <div>
            <Reveal from="left" className="lg:sticky lg:top-28">
              <SpotlightCard className="rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-accent-contrast">
                    <Briefcase className="size-5" aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
                    {job.period}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold leading-snug tracking-tight">{job.role}</h3>
                <p className="mt-2 font-medium text-foreground/90">{job.company}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {job.location}
                </p>

                <dl className="mt-7 grid grid-cols-2 gap-3">
                  {job.highlights.map((item) => (
                    <div key={item.label} className="flex flex-col rounded-2xl border border-border bg-surface-2/70 p-4">
                      <dt className="order-2 mt-1 text-xs leading-snug text-muted">{item.label}</dt>
                      <dd className="gradient-text font-display text-2xl font-bold">
                        <CountUp value={item.value} />
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Core stack">
                  {job.tech.map((tech) => (
                    <li key={tech} className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          </div>

          <Timeline items={job.bullets} />
        </div>
      ))}
    </Section>
  );
}
