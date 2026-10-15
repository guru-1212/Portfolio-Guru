import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { profile } from "@/data/portfolio";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Frontend Angular Developer with 3.5+ years building enterprise airline booking platforms for the aviation industry, and founder of OurPGTracker, a live Angular + Firebase SaaS.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  keywords: [
    "Gurunath Tangawar",
    "Frontend Developer",
    "Angular Developer",
    "TypeScript",
    "RxJS",
    "NgRx",
    "Angular Signals",
    "Next.js",
    "Hyderabad",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: profile.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#07070c" },
  ],
};

// Runs before first paint so the saved theme never flashes. Dark is the default.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'){document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Inspire Infosol Pvt. Ltd." },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.product],
  knowsAbout: ["Angular", "TypeScript", "RxJS", "NgRx", "Angular Signals", "Next.js"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div id="top" aria-hidden="true" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <CursorGlow />
        <div className="noise pointer-events-none fixed inset-0 z-[70]" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
