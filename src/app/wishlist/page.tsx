"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { readWishlist, toggleWishlisted } from "@/lib/wishlist";
import { WishlistGrid } from "@/components/product/wishlist-grid";
import { ProductGridOrEmpty } from "@/components/shop/product-grid-or-empty";

async function lookupProducts(slugs: string[]): Promise<Product[]> {
  if (slugs.length === 0) return [];
  const res = await fetch("/api/products/lookup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slugs }),
  });
  const data = await res.json();
  return data.products ?? [];
}

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    lookupProducts(readWishlist())
      .then(setProducts)
      .finally(() => setHydrated(true));
  }, []);

  function handleRemove(slug: string) {
    toggleWishlisted(slug);
    lookupProducts(readWishlist()).then(setProducts);
  }

  return (
    <div className="mx-auto max-w-[1800px] px-6 py-10">
      <p className="eyebrow mb-3">Saved</p>
      <h1 className="font-display text-3xl mb-4">Your Wishlist</h1>
      <p className="text-steel max-w-lg mb-14">
        Pieces you&rsquo;ve saved for later. Saved on this device only — sign in to sync across devices is coming soon.
      </p>

      {!hydrated ? null : products.length > 0 ? (
        <WishlistGrid products={products} onRemove={handleRemove} />
      ) : (
        <ProductGridOrEmpty
          products={[]}
          emptyMessage="Nothing saved yet. Tap the heart on any product to add it here."
        />
      )}
    </div>
  );
}
