import Link from "next/link";
import { JournalPost } from "@/lib/journal";
import { MaterialSwatch } from "@/components/product/material-swatch";

export function PostCard({ post }: { post: JournalPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-AU", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] mb-5 overflow-hidden rounded-2xl shadow-soft transition-shadow duration-500 group-hover:shadow-luxury">
        <MaterialSwatch
          gradient={post.swatch}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <p className="eyebrow mb-2">{post.category}</p>
      <h3 className="font-display text-xl leading-snug mb-2 group-hover:text-flare transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-steel leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
      <p className="text-xs text-steel font-mono">{date} &middot; {post.readTime}</p>
    </Link>
  );
}
