import {
  Accessibility,
  Atom,
  Boxes,
  Code2,
  Cpu,
  FlaskConical,
  Layers,
  Sparkles,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { skillGroups, techMarquee } from "@/data/portfolio";
import { Marquee } from "../effects/marquee";
import { SpotlightCard } from "../effects/spotlight-card";
import { Reveal } from "../reveal";
import { Section } from "../section";

const groupIcons: Record<string, LucideIcon> = {
  Languages: Code2,
  "Frameworks & UI": Layers,
  "Angular Core": Atom,
  "State Management": Workflow,
  "Architecture & Performance": Boxes,
  "APIs & Data": Cpu,
  "Web Standards": Accessibility,
  Testing: FlaskConical,
  "Tools & DevOps": Terminal,
  "AI Tools & Methods": Sparkles,
};

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title={
        <>
          The toolkit behind <span className="gradient-text">every release.</span>
        </>
      }
      description="Angular is my home base. Around it: modern state management, performance, testing and accessibility."
    >
      <div className="-mx-5 space-y-3 sm:-mx-8">
        <Marquee items={techMarquee[0]} duration={50} />
        <Marquee items={techMarquee[1]} duration={55} reverse />
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = groupIcons[group.title] ?? Code2;
          return (
            <Reveal key={group.title} delay={(index % 3) * 0.08}>
              <SpotlightCard className="h-full rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-accent/15 to-accent-2/15 text-accent">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <h3 className="font-display font-semibold">{group.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border bg-surface-2/80 px-2.5 py-1 text-sm text-foreground/85 transition-colors hover:border-accent/50 hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
