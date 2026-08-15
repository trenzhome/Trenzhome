import Link from "next/link";
import type { Metadata } from "next";
import { journalPosts, JOURNAL_CATEGORIES } from "@/lib/journal";
import { PostCard } from "@/components/journal/post-card";

export const metadata: Metadata = {
  title: "Journal",
  description: "Interior design guidance, buying guides, and care advice from Trenzhome.",
};

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.category;

  const posts = activeCategory
    ? journalPosts.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())
    : journalPosts;

  return (
    <div className="mx-auto max-w-[1800px] px-6 py-10">
      <p className="eyebrow mb-3">Journal</p>
      <h1 className="font-display text-3xl mb-4">Notes on Living Well</h1>
      <p className="text-steel max-w-lg mb-10">
        Buying guides, care advice, and the occasional opinion on why we build things the way we do.
      </p>

      <div className="flex flex-wrap gap-2 mb-14">
        <Link
          href="/journal"
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            !activeCategory ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-flare hover:text-flare"
          }`}
        >
          All
        </Link>
        {JOURNAL_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/journal?category=${encodeURIComponent(cat.toLowerCase())}`}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              activeCategory?.toLowerCase() === cat.toLowerCase()
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 hover:border-flare hover:text-flare"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/15 px-8 py-8 text-center">
          <p className="text-steel mb-4">No articles in this category yet — check back soon.</p>
          <Link href="/journal" className="btn-outline">
            View All Articles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
