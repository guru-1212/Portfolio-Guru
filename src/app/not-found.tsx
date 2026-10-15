import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Plane } from "lucide-react";
import { OpenPaletteButton } from "@/components/command-palette";
import { ParticleField } from "@/components/effects/particle-field";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="relative isolate flex flex-1 items-center overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="aurora aurora-1 -left-[10%] top-[10%] size-[30rem]" />
          <div className="aurora aurora-3 -right-[10%] bottom-[5%] size-[26rem]" />
          <div className="bg-grid absolute inset-0" />
          <ParticleField className="absolute inset-0 size-full" />
        </div>

        <div className="mx-auto w-full max-w-3xl px-5 pb-24 pt-36 text-center sm:px-8">
          <div className="relative mx-auto w-fit">
            <p
              data-text="404"
              className="glitch gradient-text select-none font-display text-[clamp(7rem,28vw,15rem)] font-bold leading-none tracking-tighter"
              aria-hidden="true"
            >
              404
            </p>
            <Plane
              className="fly-across absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 text-foreground drop-shadow-[0_0_14px_var(--accent)]"
              aria-hidden="true"
            />
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            This page has flown off the radar.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">
            The link may be broken or the page may have moved. Let&apos;s get you back on course.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 font-semibold text-accent-contrast shadow-[0_10px_40px_-10px_var(--accent)]"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to home
            </Link>
            <Link
              href="/blog"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface/70 px-6 font-medium backdrop-blur transition-colors hover:border-accent/60"
            >
              <FileText className="size-4" aria-hidden="true" />
              Read the blog
            </Link>
            <OpenPaletteButton className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface/70 px-5 font-medium backdrop-blur transition-colors hover:border-accent/60" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
