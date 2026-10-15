import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { posts } from "@/data/posts";
import { PostCard } from "../post-card";
import { Reveal } from "../reveal";
import { Section } from "../section";

export function Writing() {
  return (
    <Section
      id="writing"
      index="07"
      eyebrow="Writing"
      title={
        <>
          Notes on <span className="gradient-text">frontend engineering.</span>
        </>
      }
      description="Practical write-ups on Angular architecture, state management and performance."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {posts.slice(0, 2).map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.08}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-medium text-accent hover:underline hover:underline-offset-4"
        >
          All posts
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </Section>
  );
}
