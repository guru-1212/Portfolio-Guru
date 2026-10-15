import { Fragment } from "react";
import type { Block } from "@/data/posts";

// Renders **bold** and `code` spans. Kept deliberately tiny — post text is authored by us, not users.
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={index}
              className="rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6 text-[17px] leading-[1.8] text-muted">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="pt-6 text-2xl font-semibold leading-snug tracking-tight text-foreground"
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p key={index}>
                <RichText text={block.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={index} className="space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <div key={index} className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="border-b border-border px-4 py-2 font-mono text-xs text-muted">
                  {block.lang}
                </div>
                <pre className="overflow-x-auto p-4 text-[13.5px] leading-relaxed sm:p-5">
                  <code className="font-mono text-foreground/90">{block.code}</code>
                </pre>
              </div>
            );
          case "note":
            return (
              <aside
                key={index}
                className="rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4 text-[16px] text-foreground/85"
              >
                <RichText text={block.text} />
              </aside>
            );
        }
      })}
    </div>
  );
}
