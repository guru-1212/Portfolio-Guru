"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Download, Menu, Search, X } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";
import { openCommandPalette, useModifierKey } from "./command-palette";
import { ScrollProgress } from "./effects/scroll-progress";
import { ThemeToggle } from "./theme-toggle";

type HeaderProps = {
  /** Set on non-home pages so the matching nav item stays highlighted. */
  current?: "blog";
};

// Floating glass navigation bar. The active link gets a pill that slides between items (shared layoutId).
export function Header({ current }: Readonly<HeaderProps>) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const modKey = useModifierKey();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page, highlight the nav link for the section in the middle of the viewport.
  useEffect(() => {
    if (current) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [current]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (id: string) => (current === "blog" ? id === "writing" : active === id);
  const floating = scrolled || open;

  return (
    <>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border pl-2 pr-2 transition-all duration-500 sm:h-16 sm:pl-3 ${
            floating
              ? "border-border bg-background/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link href="/" className="group flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
            <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-full">
              <span className="spin-ring absolute inset-0" aria-hidden="true" />
              <span className="relative flex size-[34px] items-center justify-center rounded-full bg-background font-display text-sm font-bold">
                {profile.initials}
              </span>
            </span>
            <span className="hidden font-display font-semibold tracking-tight sm:block">
              {profile.name.split(" ")[0]}
              <span className="text-accent">.</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.id) ? "true" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive(item.id) ? "text-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {isActive(item.id) ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-border bg-surface-2"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              download
              className="group relative hidden h-10 items-center gap-2 overflow-hidden rounded-full bg-foreground px-4 text-sm font-medium text-background sm:inline-flex"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 transition-transform duration-500 group-hover:translate-x-0" aria-hidden="true" />
              <Download className="relative size-4" aria-hidden="true" />
              <span className="relative">Resume</span>
            </a>
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm text-muted transition-colors hover:border-accent/60 hover:text-foreground"
            >
              <Search className="size-[18px]" aria-hidden="true" />
              <kbd className="hidden font-mono text-xs xl:inline">{modKey} K</kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 max-w-6xl origin-top rounded-3xl border border-border bg-background/90 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <ul className="flex flex-col">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.id) ? "true" : undefined}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg hover:bg-surface-2 ${
                        isActive(item.id) ? "bg-surface-2 text-foreground" : "text-muted"
                      }`}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-muted">0{index + 1}</span>
                    </Link>
                  </motion.li>
                ))}
                <li className="mt-2">
                  <a
                    href={profile.resumeUrl}
                    download
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent to-accent-2 text-sm font-semibold text-accent-contrast"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Download resume
                  </a>
                </li>
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
