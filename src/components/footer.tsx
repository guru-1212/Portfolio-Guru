import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";
import { Container } from "./section";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border pt-16">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-accent/10 to-transparent"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Let&apos;s build something <span className="gradient-text">great.</span>
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 inline-block text-muted underline decoration-accent/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-accent"
            >
              {profile.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {[
              { href: profile.links.github, label: "GitHub profile", Icon: GithubIcon },
              { href: profile.links.linkedin, label: "LinkedIn profile", Icon: LinkedinIcon },
              { href: profile.links.whatsapp, label: "Chat on WhatsApp", Icon: WhatsappIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-foreground"
              >
                <Icon className="size-5" />
              </a>
            ))}
            <a
              href="#top"
              aria-label="Back to top"
              className="group flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-accent-contrast"
            >
              <ArrowUp className="size-5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <p
          className="outline-text mt-12 select-none text-center font-display text-[clamp(3.5rem,15vw,12rem)] font-bold leading-[0.8] tracking-tighter"
          aria-hidden="true"
        >
          {profile.name.split(" ")[0].toUpperCase()}
        </p>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-border py-6 text-sm text-muted sm:flex-row">
          <p>© {profile.name}</p>
          <p>Built with Next.js, TypeScript, Tailwind CSS &amp; Motion</p>
        </div>
      </Container>
    </footer>
  );
}
