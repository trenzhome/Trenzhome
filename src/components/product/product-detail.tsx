"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { MaterialSwatch } from "./material-swatch";
import { useCart } from "@/components/cart/cart-context";

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant = product.variants.find((v) => v.id === variantId)!;
  const { addLine } = useCart();

  return (
    <div className="grid md:grid-cols-2 gap-14">
      <MaterialSwatch gradient={product.swatch} className="aspect-[4/5]" />

      <div>
        <p className="eyebrow mb-3">{product.category}</p>
        <h1 className="font-display text-5xl mb-3">{product.title}</h1>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-flare">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={15}
                fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-sm text-steel">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        <p className="font-mono text-2xl font-bold mb-1">
          ${variant.price.toLocaleString()}
        </p>
        <p className="text-sm text-steel mb-8">{product.material}</p>

        <p className="text-ink/80 mb-8 max-w-md">{product.description}</p>

        {product.variants.length > 1 && (
          <div className="mb-8">
            <p className="eyebrow mb-3">Options</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  className={`border-2 px-4 py-2 text-sm font-bold uppercase transition-colors ${
                    v.id === variantId
                      ? "border-ink bg-ink text-paper"
                      : "border-steel-light hover:border-ink"
                  }`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm mb-4 font-bold uppercase tracking-wide">
          {variant.inventory > 0
            ? variant.inventory <= 5
              ? <span className="text-flare">Only {variant.inventory} left in stock</span>
              : <span className="text-steel">In stock</span>
            : <span className="text-steel">Out of stock</span>}
        </p>

        <button
          disabled={variant.inventory === 0}
          onClick={() =>
            addLine({
              variantId: variant.id,
              productSlug: product.slug,
              title: product.title,
              variantTitle: variant.title,
              price: variant.price,
              quantity: 1,
              swatch: product.swatch,
            })
          }
          className="w-full md:w-auto bg-ink text-paper px-10 py-4 text-sm font-bold uppercase tracking-widest2 hover:bg-flare hover:text-ink transition-colors disabled:opacity-40 disabled:hover:bg-ink disabled:hover:text-paper"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}
