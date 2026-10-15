import { Gauge, Languages, Layers, Rocket, Users } from "lucide-react";
import { profile } from "@/data/portfolio";
import { CountUp } from "../effects/count-up";
import { SpotlightCard } from "../effects/spotlight-card";
import { Reveal } from "../reveal";
import { Section } from "../section";

const strengths = [
  {
    icon: Layers,
    title: "Component libraries",
    text: "40+ reusable components in a shared UI library; 30+ Figma screens turned into pixel-accurate Angular.",
  },
  {
    icon: Gauge,
    title: "Performance & architecture",
    text: "Lazy loading, code splitting, OnPush, Angular Signals and Module Federation microfrontends.",
  },
  {
    icon: Users,
    title: "Quality & mentoring",
    text: "~80% coverage on owned modules, WCAG 2.1 fixes, 100+ PRs reviewed, 3+ juniors mentored.",
  },
] as const;

const card = "h-full rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur sm:p-7";

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          Enterprise-grade frontends, <span className="gradient-text">built to last.</span>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
        <Reveal className="lg:col-span-4 lg:row-span-2">
          <SpotlightCard className={`${card} flex flex-col justify-between`}>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              <p className="font-display text-2xl font-medium leading-snug text-foreground sm:text-[1.7rem]">
                I turn complex booking journeys into fast, accessible and maintainable Angular interfaces.
              </p>
              <p>{profile.summary}</p>
            </div>
            <a
              href={profile.links.product}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-surface-2/70 p-4 transition-colors hover:border-accent/50"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-accent-contrast">
                <Rocket className="size-5" aria-hidden="true" />
              </span>
              <span className="text-[15px] leading-snug text-muted">
                <span className="block font-semibold text-foreground">Founder of OurPGTracker</span>
                A live Angular + Firebase SaaS with a paying customer managing 119 beds.
              </span>
            </a>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-2">
          <SpotlightCard className={`${card} flex flex-col justify-center`}>
            <p className="gradient-text font-display text-7xl font-bold tracking-tight">
              <CountUp value="3.5+" />
            </p>
            <p className="mt-2 text-muted">years shipping production Angular for the aviation industry</p>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.14} className="lg:col-span-2">
          <SpotlightCard className={card}>
            <p className="flex items-center gap-2 font-mono text-sm text-accent">
              <Languages className="size-4" aria-hidden="true" />
              I speak
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.languages.map((language) => (
                <li
                  key={language}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1 text-sm text-foreground/90"
                >
                  {language}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>

        {strengths.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08} className="lg:col-span-2">
            <SpotlightCard tilt className={card}>
              <span className="flex size-12 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-accent/15 to-accent-2/15 text-accent">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.text}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
