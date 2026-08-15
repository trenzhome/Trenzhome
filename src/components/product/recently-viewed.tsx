"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { readRecentlyViewed } from "@/lib/recently-viewed";
import { ProductCard } from "./product-card";

export function RecentlyViewed({ excludeSlug }: { excludeSlug: string }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const slugs = readRecentlyViewed().filter((s) => s !== excludeSlug);
    if (slugs.length === 0) return;
    fetch("/api/products/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slugs }),
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setProducts([]));
  }, [excludeSlug]);

  if (products.length === 0) return null;

  return (
    <section className="mt-24">
      <p className="eyebrow mb-3">Recently Viewed</p>
      <h2 className="font-display text-2xl mb-8">Where You Left Off</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
