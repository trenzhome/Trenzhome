"use client";

import { useEffect, useState } from "react";
import { getProductBySlug } from "@/lib/products";
import { readWishlist, toggleWishlisted } from "@/lib/wishlist";
import { WishlistGrid } from "@/components/product/wishlist-grid";
import { ProductGridOrEmpty } from "@/components/shop/product-grid-or-empty";

export default function WishlistPage() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSlugs(readWishlist());
    setHydrated(true);
  }, []);

  function handleRemove(slug: string) {
    toggleWishlisted(slug);
    setSlugs(readWishlist());
  }

  const products = slugs
    .map(getProductBySlug)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="eyebrow mb-3">Saved</p>
      <h1 className="font-display text-5xl mb-4">Your Wishlist</h1>
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
