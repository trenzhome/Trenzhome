"use client";

import { X } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "./product-card";

export function WishlistGrid({
  products,
  onRemove,
}: {
  products: Product[];
  onRemove: (slug: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((product) => (
        <div key={product.id} className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove(product.slug);
            }}
            aria-label={`Remove ${product.title} from wishlist`}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 shadow-soft text-ink hover:text-flare transition-colors"
          >
            <X size={15} strokeWidth={2} />
          </button>
          <ProductCard product={product} showWishlistButton={false} />
        </div>
      ))}
    </div>
  );
}
