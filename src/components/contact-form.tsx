"use client";

import { useState, type FormEvent } from "react";
import { CircleAlert, LoaderCircle, Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none";

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else {
        // 503 = server has no email provider configured yet.
        setStatus(response.status === 503 ? "unavailable" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-[calc(1.6rem-1.5px)] bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Tell me about the role or project…"
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Honeypot: hidden from people, tempting to bots. The API drops any submission that fills it. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {sending ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {sending ? "Sending…" : "Send message"}
      </button>

      <div aria-live="polite" className="min-h-6 text-sm">
        {status === "sent" ? (
          <p className="text-emerald-600 dark:text-emerald-400">
            Thanks — your message is on its way. I&apos;ll reply soon.
          </p>
        ) : null}
        {status === "unavailable" ? (
          <p className="flex items-start gap-2 text-amber-600 dark:text-amber-400">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              The form isn&apos;t connected yet. Please email me directly at{" "}
              <a href={`mailto:${email}`} className="font-medium underline underline-offset-2">
                {email}
              </a>
              .
            </span>
          </p>
        ) : null}
        {status === "error" ? (
          <p className="flex items-start gap-2 text-red-600 dark:text-red-400">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              Something went wrong. Please try again, or email{" "}
              <a href={`mailto:${email}`} className="font-medium underline underline-offset-2">
                {email}
              </a>
              .
            </span>
          </p>
        ) : null}
      </div>
    </form>
  );
}
