"use client";

import { useEffect, useState } from "react";
import { getProductBySlug } from "@/lib/products";
import { readRecentlyViewed } from "@/lib/recently-viewed";
import { ProductCard } from "./product-card";

export function RecentlyViewed({ excludeSlug }: { excludeSlug: string }) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(readRecentlyViewed().filter((s) => s !== excludeSlug));
  }, [excludeSlug]);

  const products = slugs.map(getProductBySlug).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) return null;

  return (
    <section className="mt-24">
      <p className="eyebrow mb-3">Recently Viewed</p>
      <h2 className="font-display text-3xl mb-8">Where You Left Off</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
