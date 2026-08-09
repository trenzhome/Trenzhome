"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Heart, Check } from "lucide-react";
import { Product } from "@/types";
import { MaterialSwatch } from "./material-swatch";
import { isWishlisted, toggleWishlisted } from "@/lib/wishlist";

export function ProductCard({
  product,
  compareMode = false,
  compareSelected = false,
  onToggleCompare,
  showWishlistButton = true,
}: {
  product: Product;
  compareMode?: boolean;
  compareSelected?: boolean;
  onToggleCompare?: (slug: string) => void;
  showWishlistButton?: boolean;
}) {
  const onSale = product.compareAtPrice && product.compareAtPrice > product.basePrice;
  const percentOff = onSale
    ? Math.round((1 - product.basePrice / product.compareAtPrice!) * 100)
    : 0;
  const lowStock = product.variants.some((v) => v.inventory > 0 && v.inventory <= 4);
  const swatchColours = Array.from(
    new Set(product.variants.map((v) => v.tint).filter((t): t is string => Boolean(t)))
  );

  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setWishlisted(isWishlisted(product.slug));
  }, [product.slug]);

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-2xl shadow-soft transition-shadow duration-500 group-hover:shadow-luxury">
        <MaterialSwatch
          gradient={product.swatch}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-ink text-paper text-[10px] font-bold uppercase tracking-widest2 px-2.5 py-1">
              New In
            </span>
          )}
          {onSale && (
            <span className="rounded-full bg-flare text-paper text-[10px] font-bold uppercase tracking-widest2 px-2.5 py-1">
              {percentOff}% Off
            </span>
          )}
          {lowStock && (
            <span className="rounded-full bg-paper/90 text-ink text-[10px] font-bold uppercase tracking-widest2 px-2.5 py-1">
              Low Stock
            </span>
          )}
        </div>

        {(compareMode || showWishlistButton) && (
          <button
            type="button"
            aria-label={
              compareMode
                ? compareSelected
                  ? `Remove ${product.title} from compare`
                  : `Add ${product.title} to compare`
                : wishlisted
                ? `Remove ${product.title} from wishlist`
                : `Save ${product.title} to wishlist`
            }
            aria-pressed={compareMode ? compareSelected : wishlisted}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (compareMode) {
                onToggleCompare?.(product.slug);
              } else {
                setWishlisted(toggleWishlisted(product.slug));
              }
            }}
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-ink shadow-soft transition-all duration-200 hover:text-flare ${
              compareSelected || wishlisted
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            }`}
          >
            {compareMode ? (
              compareSelected ? (
                <Check size={15} strokeWidth={2.5} className="text-flare" />
              ) : (
                <span className="h-3.5 w-3.5 rounded-sm border-2 border-ink/40" />
              )
            ) : (
              <Heart
                size={15}
                strokeWidth={1.75}
                fill={wishlisted ? "currentColor" : "none"}
                className={wishlisted ? "text-flare" : ""}
              />
            )}
          </button>
        )}
      </div>
      <p className="eyebrow mb-1">{product.category}</p>
      <h3 className="font-display text-lg leading-snug text-ink group-hover:text-flare transition-colors">
        {product.title}
      </h3>
      <p className="text-sm text-steel mt-1">{product.material}</p>
      {swatchColours.length > 1 && (
        <div className="mt-2 flex items-center gap-1.5">
          {swatchColours.map((tint) => (
            <span
              key={tint}
              className="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-ink/15"
              style={{ backgroundColor: tint }}
            />
          ))}
        </div>
      )}
      {product.rating != null && product.reviewCount != null && (
        <div className="mt-2 flex items-center gap-1">
          <Star size={13} fill="currentColor" strokeWidth={0} className="text-flare" />
          <span className="text-xs text-steel font-mono">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
      )}
      <div className="mt-2 flex items-baseline gap-2 font-mono text-sm">
        <span className="text-ink font-bold">${product.basePrice.toLocaleString()}</span>
        {onSale && (
          <span className="text-steel line-through">
            ${product.compareAtPrice!.toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  );
}
