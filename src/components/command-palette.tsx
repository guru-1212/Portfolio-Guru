"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type KeyboardEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  CircleCheck,
  Code2,
  Copy,
  CornerDownLeft,
  Download,
  FileText,
  FolderGit2,
  GraduationCap,
  House,
  Mail,
  Moon,
  Phone,
  Rocket,
  Search,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import { posts } from "@/data/posts";
import { toggleTheme } from "@/lib/theme";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";

export const OPEN_PALETTE_EVENT = "open-command-palette";

/** Opens the palette from anywhere (e.g. the header search button). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}

/** Button that opens the palette, showing the right shortcut for the platform. */
export function OpenPaletteButton({ className = "" }: { className?: string }) {
  const modKey = useModifierKey();
  return (
    <button type="button" onClick={openCommandPalette} className={className}>
      <Search className="size-4" aria-hidden="true" />
      Search the site
      <kbd className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted">{modKey} K</kbd>
    </button>
  );
}

// "⌘" on Apple devices, "Ctrl" elsewhere. Server render assumes Ctrl.
const subscribeNoop = () => () => {};
export function useModifierKey() {
  return useSyncExternalStore(
    subscribeNoop,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "Ctrl",
  );
}

type Group = "Navigate" | "Actions" | "Connect" | "Blog";
const GROUP_ORDER: Group[] = ["Navigate", "Actions", "Connect", "Blog"];

type Command = {
  id: string;
  group: Group;
  label: string;
  keywords?: string;
  hint?: string;
  icon: ComponentType<{ className?: string }>;
  /** Return a message to show it as a confirmation toast. */
  run: () => void | string | Promise<void | string>;
};

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const listId = useId();
  const modKey = useModifierKey();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const returnFocus = useRef<HTMLElement | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  // Ctrl/⌘+K toggles; the header button dispatches OPEN_PALETTE_EVENT.
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, show);
    };
  }, [open, show, close]);

  // Lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => {
      if (href.startsWith("/#") && pathname === "/") {
        document.getElementById(href.slice(2))?.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", href);
      } else {
        router.push(href);
      }
    };
    const external = (url: string) => () => {
      window.open(url, "_blank", "noopener,noreferrer");
    };
    const copy = (text: string, message: string) => async () => {
      try {
        await navigator.clipboard.writeText(text);
        return message;
      } catch {
        return `Couldn't copy — it's ${text}`;
      }
    };

    return [
      { id: "home", group: "Navigate", label: "Home", keywords: "top hero start", icon: House, run: go("/#top") },
      { id: "about", group: "Navigate", label: "About", keywords: "summary bio", icon: User, run: go("/#about") },
      { id: "skills", group: "Navigate", label: "Skills", keywords: "tech stack angular", icon: Code2, run: go("/#skills") },
      { id: "experience", group: "Navigate", label: "Experience", keywords: "work job inspire", icon: Briefcase, run: go("/#experience") },
      { id: "projects", group: "Navigate", label: "Projects", keywords: "work ourpgtracker airline", icon: Rocket, run: go("/#projects") },
      { id: "github", group: "Navigate", label: "GitHub activity", keywords: "repos contributions code", icon: FolderGit2, run: go("/#github") },
      { id: "education", group: "Navigate", label: "Education", keywords: "degree certificate", icon: GraduationCap, run: go("/#education") },
      { id: "blog", group: "Navigate", label: "Blog", keywords: "writing posts articles", icon: FileText, run: go("/blog") },
      { id: "contact", group: "Navigate", label: "Contact", keywords: "message hire email form", icon: Send, run: go("/#contact") },

      { id: "copy-email", group: "Actions", label: "Copy email address", hint: profile.email, keywords: "mail", icon: Copy, run: copy(profile.email, "Email copied to clipboard") },
      { id: "copy-phone", group: "Actions", label: "Copy phone number", hint: profile.phone, keywords: "call mobile", icon: Copy, run: copy(profile.phone, "Phone number copied") },
      {
        id: "resume",
        group: "Actions",
        label: "Download resume",
        keywords: "cv pdf",
        icon: Download,
        run: () => {
          const link = document.createElement("a");
          link.href = profile.resumeUrl;
          link.download = "";
          link.click();
          return "Resume download started";
        },
      },
      { id: "theme", group: "Actions", label: "Toggle light / dark theme", keywords: "mode appearance", icon: Moon, run: toggleTheme },

      { id: "whatsapp", group: "Connect", label: "Chat on WhatsApp", keywords: "message", icon: WhatsappIcon, run: external(profile.links.whatsapp) },
      { id: "email", group: "Connect", label: "Send an email", hint: profile.email, keywords: "mail", icon: Mail, run: external(`mailto:${profile.email}`) },
      { id: "call", group: "Connect", label: "Call", hint: profile.phone, keywords: "phone", icon: Phone, run: external(profile.phoneHref) },
      { id: "linkedin", group: "Connect", label: "LinkedIn", icon: LinkedinIcon, run: external(profile.links.linkedin) },
      { id: "github-profile", group: "Connect", label: "GitHub profile", keywords: "code repos", icon: GithubIcon, run: external(profile.links.github) },
      { id: "ourpgtracker", group: "Connect", label: "Visit OurPGTracker", hint: "ourpgtracker.in", keywords: "saas product live", icon: Sparkles, run: external(profile.links.product) },

      ...posts.map<Command>((post) => ({
        id: `post-${post.slug}`,
        group: "Blog",
        label: post.title,
        keywords: post.tags.join(" "),
        icon: FileText,
        run: go(`/blog/${post.slug}`),
      })),
    ];
  }, [pathname, router]);

  // Filter, then order by group so keyboard order matches what's on screen.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = q
      ? commands.filter((command) =>
          `${command.label} ${command.keywords ?? ""} ${command.hint ?? ""}`.toLowerCase().includes(q),
        )
      : commands;
    return GROUP_ORDER.flatMap((group) => matched.filter((command) => command.group === group));
  }, [commands, query]);

  // Keep the highlighted row in view.
  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, listId]);

  async function execute(command: Command | undefined) {
    if (!command) return;
    close();
    const message = await command.run();
    if (typeof message === "string") {
      setToast(message);
      window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 2200);
    }
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      void execute(results[active]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Tab") {
      // Keep focus inside the dialog.
      event.preventDefault();
    }
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="palette"
            className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} aria-hidden="true" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-background/90 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            >
              <div className="flex items-center gap-3 border-b border-border px-5">
                <Search className="size-5 shrink-0 text-accent" aria-hidden="true" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  placeholder="Type a command or search…"
                  aria-label="Search commands"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={listId}
                  aria-autocomplete="list"
                  aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
                  className="h-16 w-full bg-transparent text-base text-foreground placeholder:text-muted focus:outline-none"
                />
                <kbd className="hidden rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted sm:block">
                  Esc
                </kbd>
              </div>

              <ul id={listId} role="listbox" aria-label="Commands" className="max-h-[min(60vh,26rem)] overflow-y-auto p-2">
                {results.length === 0 ? (
                  <li className="px-4 py-10 text-center text-sm text-muted">No results for “{query}”</li>
                ) : (
                  results.map((command, index) => {
                    const showGroup = index === 0 || results[index - 1].group !== command.group;
                    const selected = index === active;
                    return (
                      <li key={command.id} role="presentation">
                        {showGroup ? (
                          <p className="px-3 pb-1.5 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted" aria-hidden="true">
                            {command.group}
                          </p>
                        ) : null}
                        <div
                          id={`${listId}-${index}`}
                          role="option"
                          aria-selected={selected}
                          onMouseMove={() => setActive(index)}
                          onClick={() => void execute(command)}
                          className={`relative flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors ${
                            selected ? "text-foreground" : "text-muted"
                          }`}
                        >
                          {selected ? (
                            <motion.span
                              layoutId="palette-active"
                              className="absolute inset-0 -z-10 rounded-2xl border border-accent/30 bg-accent/10"
                              transition={{ type: "spring", stiffness: 500, damping: 38 }}
                            />
                          ) : null}
                          <span
                            className={`flex size-8 shrink-0 items-center justify-center rounded-lg border border-border ${
                              selected ? "bg-gradient-to-br from-accent to-accent-2 text-accent-contrast" : "bg-surface"
                            }`}
                          >
                            <command.icon className="size-4" />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{command.label}</span>
                          {command.hint ? (
                            <span className="hidden truncate font-mono text-xs text-muted sm:block">{command.hint}</span>
                          ) : null}
                          {selected ? <CornerDownLeft className="size-4 shrink-0 text-accent" aria-hidden="true" /> : null}
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>

              <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-3 font-mono text-[11px] text-muted">
                <span className="flex items-center gap-3">
                  <span><kbd className="rounded border border-border px-1">↑</kbd> <kbd className="rounded border border-border px-1">↓</kbd> navigate</span>
                  <span><kbd className="rounded border border-border px-1">↵</kbd> select</span>
                </span>
                <span>
                  <kbd className="rounded border border-border px-1">{modKey}</kbd> <kbd className="rounded border border-border px-1">K</kbd> toggle
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {toast ? (
          <motion.div
            key="toast"
            role="status"
            className="fixed bottom-24 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2.5 text-sm shadow-2xl backdrop-blur-xl sm:bottom-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <CircleCheck className="size-4 text-emerald-500" aria-hidden="true" />
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
