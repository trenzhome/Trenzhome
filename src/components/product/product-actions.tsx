"use client";

import { useEffect, useState } from "react";
import { Heart, Share2, Check } from "lucide-react";
import { isWishlisted, toggleWishlisted } from "@/lib/wishlist";

export function ProductActions({ slug, title }: { slug: string; title: string }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    setWishlisted(isWishlisted(slug));
  }, [slug]);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled the native share sheet — fall through to clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setWishlisted(toggleWishlisted(slug))}
        aria-pressed={wishlisted}
        className="flex items-center gap-2 text-sm font-medium text-steel hover:text-flare transition-colors"
      >
        <Heart size={17} strokeWidth={1.75} fill={wishlisted ? "currentColor" : "none"} className={wishlisted ? "text-flare" : ""} />
        {wishlisted ? "Saved" : "Save"}
      </button>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 text-sm font-medium text-steel hover:text-flare transition-colors"
      >
        {shared ? <Check size={17} strokeWidth={1.75} /> : <Share2 size={17} strokeWidth={1.75} />}
        {shared ? "Copied" : "Share"}
      </button>
    </div>
  );
}
