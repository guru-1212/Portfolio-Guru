import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

type SectionProps = {
  id: string;
  /** Two-digit section number shown before the label, e.g. "01". */
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
};

export function Section({ id, index, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-sm tracking-wide text-accent">
            <span className="text-muted">{index}</span>
            <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal blur delay={0.05}>
          <h2
            id={`${id}-title`}
            className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl"
          >
            {title}
          </h2>
        </Reveal>
        {description ? (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
          </Reveal>
        ) : null}
        <div className="mt-14">{children}</div>
      </Container>
    </section>
  );
}
