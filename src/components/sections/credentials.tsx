import { Award, GraduationCap } from "lucide-react";
import { certifications, education } from "@/data/portfolio";
import { SpotlightCard } from "../effects/spotlight-card";
import { Reveal } from "../reveal";
import { Section } from "../section";

const card = "h-full rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur sm:p-7";
const pill = "mt-5 w-fit rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-sm text-muted";

export function Credentials() {
  return (
    <Section
      id="education"
      index="05"
      eyebrow="Education"
      title={
        <>
          Education &amp; <span className="gradient-text">training.</span>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal from="left">
          <SpotlightCard tilt className={card}>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-accent-contrast">
              <GraduationCap className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{education.degree}</h3>
            <p className="mt-2 text-foreground/90">{education.school}</p>
            <p className="mt-1 text-sm text-muted">{education.university}</p>
            <p className={pill}>{education.period}</p>
          </SpotlightCard>
        </Reveal>

        {certifications.map((cert) => (
          <Reveal key={cert.title} from="right">
            <SpotlightCard tilt className={card}>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-2 to-accent-3 text-accent-contrast">
                <Award className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{cert.title}</h3>
              <p className="mt-2 text-foreground/90">{cert.issuer}</p>
              <p className={pill}>
                {cert.date} · {cert.detail}
              </p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
