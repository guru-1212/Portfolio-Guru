import Image from "next/image";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { heroPhrases, profile, stats } from "@/data/portfolio";
import { CountUp } from "../effects/count-up";
import { FloatingBadge, HeroName } from "../effects/hero-motion";
import { Magnetic } from "../effects/magnetic";
import { ParticleField } from "../effects/particle-field";
import { RotatingWords } from "../effects/rotating-words";
import { SpotlightCard } from "../effects/spotlight-card";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "../icons";
import { Reveal } from "../reveal";
import { Container } from "../section";

const [firstName, ...rest] = profile.name.split(" ");
const lastName = rest.join(" ");

export function Hero() {
  return (
    <section aria-label="Introduction" className="relative isolate overflow-hidden">
      {/* Background layers: aurora light, grid, interactive particles, bottom fade. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="aurora aurora-1 -left-[10%] -top-[10%] size-[38rem]" />
        <div className="aurora aurora-2 -right-[12%] top-[10%] size-[32rem]" />
        <div className="aurora aurora-3 bottom-[5%] left-[30%] size-[26rem]" />
        <div className="bg-grid absolute inset-0" />
        <ParticleField className="absolute inset-0 size-full" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <Container className="flex min-h-[100svh] flex-col justify-center pb-16 pt-32 sm:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <div>
            <Reveal immediate>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 py-1.5 pl-2 pr-4 text-sm text-muted backdrop-blur-md">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-foreground">{profile.role}</span>
                <span className="text-border">|</span>
                <MapPin className="size-3.5 text-accent" aria-hidden="true" />
                {profile.location.split(",")[0]}
              </p>
            </Reveal>

            <h1 className="mt-7 font-display text-[clamp(3rem,10vw,6.5rem)] font-bold leading-[0.95] tracking-tight">
              <HeroName first={firstName} last={lastName} />
            </h1>

            <Reveal immediate delay={0.7}>
              <p className="mt-7 font-display text-xl font-medium sm:text-2xl">
                I build <RotatingWords words={heroPhrases} />
              </p>
            </Reveal>

            <Reveal immediate delay={0.85}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{profile.headline}</p>
            </Reveal>

            <Reveal immediate delay={1}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a
                    href="#projects"
                    className="group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 bg-[length:200%_100%] px-7 font-semibold text-accent-contrast shadow-[0_10px_40px_-10px_var(--accent)] transition-[background-position] duration-700 hover:bg-[position:100%_0]"
                  >
                    View my work
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={profile.resumeUrl}
                    download
                    className="inline-flex h-13 items-center gap-2 rounded-full border border-border bg-surface/70 px-7 font-medium backdrop-blur-md transition-colors hover:border-accent/60 hover:bg-surface-2"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Resume
                  </a>
                </Magnetic>
                <div className="flex items-center gap-2">
                  {[
                    { href: profile.links.github, label: "GitHub profile", Icon: GithubIcon },
                    { href: profile.links.linkedin, label: "LinkedIn profile", Icon: LinkedinIcon },
                    { href: profile.links.whatsapp, label: "Chat on WhatsApp", Icon: WhatsappIcon },
                  ].map(({ href, label, Icon }) => (
                    <Magnetic key={label} strength={0.4}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex size-13 items-center justify-center rounded-full border border-border bg-surface/70 text-muted backdrop-blur-md transition-colors hover:border-accent/60 hover:text-foreground"
                      >
                        <Icon className="size-5" />
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Portrait with spinning gradient ring and floating tech badges. */}
          <Reveal immediate delay={0.4} className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm">
            <div className="relative aspect-square">
              <div className="spin-ring absolute -inset-[3px] rounded-[2.4rem] opacity-90" aria-hidden="true" />
              <div className="spin-ring absolute -inset-6 rounded-[3rem] opacity-40 blur-3xl" aria-hidden="true" />
              <div className="relative size-full overflow-hidden rounded-[2.3rem] bg-surface">
                {profile.photo ? (
                  <Image
                    src={profile.photo}
                    alt={`Portrait of ${profile.name}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 24rem, 19rem"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-gradient-to-br from-accent/25 to-accent-2/25">
                    <span className="gradient-text font-display text-8xl font-bold">{profile.initials}</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
              </div>

              <FloatingBadge className="-left-4 top-8 sm:-left-10" delay={0} label="Angular" />
              <FloatingBadge className="-right-3 top-1/3 sm:-right-8" delay={0.8} label="TypeScript" />
              <FloatingBadge className="-left-3 bottom-16 sm:-left-12" delay={1.6} label="RxJS · NgRx" />
              <FloatingBadge className="-right-2 -bottom-4 sm:-right-6" delay={2.4} label="Signals" />
            </div>
          </Reveal>
        </div>

        {/* Stats band */}
        <Reveal delay={0.2} className="mt-20">
          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((stat) => (
              <SpotlightCard
                key={stat.label}
                className="flex flex-col rounded-2xl border border-border bg-surface/60 px-5 py-6 backdrop-blur-md sm:px-6"
              >
                <dt className="order-2 mt-1.5 text-sm text-muted">{stat.label}</dt>
                <dd className="gradient-text font-display text-3xl font-bold tracking-tight sm:text-5xl">
                  <CountUp value={stat.value} />
                </dd>
              </SpotlightCard>
            ))}
          </dl>
        </Reveal>

        <a
          href="#about"
          aria-label="Scroll to About"
          className="mx-auto mt-14 hidden h-10 w-6 justify-center rounded-full border-2 border-muted/50 pt-2 md:flex"
        >
          <span className="scroll-dot block size-1.5 rounded-full bg-accent" />
        </a>
      </Container>
    </section>
  );
}
