import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/portfolio";
import { ContactForm } from "../contact-form";
import { SpotlightCard } from "../effects/spotlight-card";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "../icons";
import { Reveal } from "../reveal";
import { Section } from "../section";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, external: false },
  { label: "WhatsApp", value: "Chat with me", href: profile.links.whatsapp, Icon: WhatsappIcon, external: true },
  { label: "Phone", value: profile.phone, href: profile.phoneHref, Icon: Phone, external: false },
  { label: "LinkedIn", value: "guru-tangawar", href: profile.links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "GitHub", value: "guru-1212", href: profile.links.github, Icon: GithubIcon, external: true },
] as const;

export function Contact() {
  return (
    <Section
      id="contact"
      index="08"
      eyebrow="Contact"
      title={
        <>
          Have a role or a project? <span className="gradient-text">Let&apos;s talk.</span>
        </>
      }
      description="Send a message, ping me on WhatsApp, give me a call, or connect on LinkedIn."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:gap-8">
        <Reveal from="left">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <SpotlightCard className="rounded-2xl border border-border bg-surface/80 backdrop-blur">
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 p-4"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-2/15 text-accent transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-wider text-muted">{label}</span>
                      <span className="block truncate font-medium">{value}</span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </SpotlightCard>
              </li>
            ))}
            <li className="flex items-center gap-4 px-4 py-2 text-muted">
              <MapPin className="size-5 text-accent" aria-hidden="true" />
              Based in {profile.location}
            </li>
          </ul>
        </Reveal>

        <Reveal from="right" delay={0.08}>
          <div className="animated-border rounded-[1.6rem] p-[1.5px]">
            <ContactForm email={profile.email} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
