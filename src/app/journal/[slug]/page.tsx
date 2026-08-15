import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { journalPosts, getJournalPostBySlug, getRelatedPosts } from "@/lib/journal";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { PostCard } from "@/components/journal/post-card";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const date = new Date(post.publishedAt).toLocaleDateString("en-AU", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <p className="eyebrow mb-3">{post.category}</p>
      <h1 className="font-display text-3xl md:text-4xl mb-6 leading-tight">{post.title}</h1>
      <p className="text-sm text-steel font-mono mb-10">{date} &middot; {post.readTime}</p>

      <MaterialSwatch gradient={post.swatch} className="aspect-[16/9] rounded-2xl shadow-soft mb-12" />

      <div className="space-y-6">
        {post.content.map((paragraph, i) => (
          <p key={i} className="text-ink/80 leading-relaxed text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-ink/10">
        <Link href="/journal" className="text-sm font-medium text-steel hover:text-flare transition-colors">
          &larr; Back to Journal
        </Link>
      </div>

      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-ink/10">
          <p className="eyebrow mb-8">More in {post.category}</p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
