import Image from "next/image";
import { ArrowUpRight, Plane, Sun } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { CountUp } from "../effects/count-up";
import { SpotlightCard } from "../effects/spotlight-card";
import { PgDashboardPreview } from "../pg-dashboard-preview";
import { Reveal } from "../reveal";
import { Section } from "../section";

const icons = { plane: Plane, sun: Sun } as const;

function TechList({ tech }: { tech: Project["tech"] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
      {tech.map((item) => (
        <li
          key={item}
          className="rounded-md border border-border bg-surface-2/80 px-2 py-0.5 font-mono text-xs text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5 text-[15px] leading-relaxed text-muted">
      {items.map((point) => (
        <li key={point} className="flex gap-3">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent to-accent-2" aria-hidden="true" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    // Spinning conic gradient shows through the 1.5px padding as an animated border.
    <div className="animated-border rounded-[2rem] p-[1.5px] shadow-[0_30px_80px_-30px_var(--accent)]">
      <SpotlightCard className="overflow-hidden rounded-[calc(2rem-1.5px)] bg-surface">
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          <div className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-surface-2 to-accent-2/20">
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="relative">
                <PgDashboardPreview />
              </div>
            )}
          </div>

          <div className="flex flex-col p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              {project.badge ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  {project.badge}
                </span>
              ) : null}
              <p className="font-mono text-sm text-accent">{project.kind}</p>
            </div>
            <h3 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">{project.name}</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">{project.description}</p>
            <div className="mt-5">
              <Bullets items={project.highlights} />
            </div>
            <div className="mt-6">
              <TechList tech={project.tech} />
            </div>
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 text-sm font-semibold text-accent-contrast shadow-[0_10px_30px_-10px_var(--accent)]"
              >
                {project.hrefLabel ?? "Visit project"}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

function ProjectCard({ project, number }: { project: Project; number: number }) {
  const Icon = project.icon ? icons[project.icon] : null;
  return (
    <SpotlightCard tilt className="group flex h-full flex-col rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur sm:p-7">
      <div className="flex items-start justify-between">
        {Icon ? (
          <span className="flex size-12 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-accent/15 to-accent-2/15 text-accent transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
            <Icon className="size-5" aria-hidden="true" />
          </span>
        ) : (
          <span />
        )}
        <span className="font-display text-5xl font-bold text-foreground/[0.06]" aria-hidden="true">
          0{number}
        </span>
      </div>
      <p className="mt-5 font-mono text-xs uppercase tracking-wider text-accent">{project.kind}</p>
      <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight">{project.name}</h3>
      {project.metric ? (
        <p className="mt-4 flex items-baseline gap-2">
          <span className="gradient-text font-display text-3xl font-bold">
            <CountUp value={project.metric.value} />
          </span>
          <span className="text-sm text-muted">{project.metric.label}</span>
        </p>
      ) : null}
      <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
      <div className="mt-4">
        <Bullets items={project.highlights} />
      </div>
      <div className="mt-auto pt-6">
        <TechList tech={project.tech} />
      </div>
    </SpotlightCard>
  );
}

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Projects"
      title={
        <>
          Products I&apos;ve <span className="gradient-text">launched &amp; scaled.</span>
        </>
      }
      description="From a SaaS I designed, built and run myself, to enterprise booking platforms serving thousands of travellers."
    >
      <div className="space-y-6">
        {featured.map((project) => (
          <Reveal key={project.name} blur>
            <FeaturedProject project={project} />
          </Reveal>
        ))}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {others.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.1}>
              <ProjectCard project={project} number={index + 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
