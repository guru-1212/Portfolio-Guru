import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PostCard } from "@/components/post-card";
import { Container } from "@/components/section";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on Angular architecture, state management and frontend performance.",
};

export default function BlogPage() {
  return (
    <>
      <Header current="blog" />
      <main id="main" className="flex-1">
        <Container className="pb-16 pt-32 sm:pb-24 sm:pt-40">
          <p className="font-mono text-sm tracking-wide text-accent">Blog</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Notes on <span className="gradient-text">frontend engineering</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Practical write-ups on Angular architecture, state management and performance — the
            things I use every day building large booking platforms.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
