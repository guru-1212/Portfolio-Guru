import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, readingMinutes, type Post } from "@/data/posts";
import { SpotlightCard } from "./effects/spotlight-card";

export function PostCard({ post }: { post: Post }) {
  return (
    <SpotlightCard
      tilt
      className="group flex h-full flex-col rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur sm:p-7"
    >
      <article className="flex h-full flex-col">
        <p className="font-mono text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingMinutes(post)} min read
        </p>
        <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{post.description}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-border bg-surface-2/80 px-2 py-0.5 font-mono text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-contrast"
            aria-hidden="true"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </article>
    </SpotlightCard>
  );
}
