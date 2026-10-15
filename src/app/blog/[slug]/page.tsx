import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PostBody } from "@/components/post-body";
import { formatDate, getPost, posts, readingMinutes } from "@/data/posts";
import { profile } from "@/data/portfolio";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [profile.name],
      // A page-level openGraph drops the root share image, so reference it explicitly.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name} — ${profile.role}` }],
    },
  };
}

// Header and footer are part of the static shell; the post reads `params`, so it sits behind
// <Suspense> (required by Cache Components). Known slugs are still prerendered via generateStaticParams.
export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <>
      <Header current="blog" />
      <main id="main" className="flex-1">
        <Suspense fallback={<div className="mx-auto min-h-[60vh] w-full max-w-3xl px-5 sm:px-8" />}>
          <PostArticle params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

async function PostArticle({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-36">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All posts
      </Link>

      <header className="mt-8 border-b border-border pb-8">
        <ul className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{post.description}</p>
        <p className="mt-6 font-mono text-sm text-muted">
          {profile.name} · <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
          {readingMinutes(post)} min read
        </p>
      </header>

      <div className="mt-10">
        <PostBody blocks={post.blocks} />
      </div>

      <footer className="mt-16 rounded-2xl border border-border bg-surface p-6">
        <p className="font-medium">Thanks for reading.</p>
        <p className="mt-1 text-muted">
          Questions or feedback?{" "}
          <Link href="/#contact" className="text-accent hover:underline hover:underline-offset-4">
            Get in touch
          </Link>
          .
        </p>
      </footer>
    </article>
  );
}
