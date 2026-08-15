"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Check, Plus } from "lucide-react";
import { Product } from "@/types";
import { MaterialSwatch } from "./material-swatch";
import { isWishlisted, toggleWishlisted } from "@/lib/wishlist";
import { useCart } from "@/components/cart/cart-context";

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
  const { addLine } = useCart();

  useEffect(() => {
    setWishlisted(isWishlisted(product.slug));
  }, [product.slug]);

  const quickAddVariant = product.variants.find((v) => v.inventory > 0) ?? product.variants[0];

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] mb-3 overflow-hidden rounded-xl shadow-soft transition-shadow duration-500 group-hover:shadow-luxury">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 20vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <MaterialSwatch
            gradient={product.swatch}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="rounded-full bg-ink text-paper text-[9px] font-bold uppercase tracking-widest2 px-2 py-0.5">
              New In
            </span>
          )}
          {onSale && (
            <span className="rounded-full bg-flare text-paper text-[9px] font-bold uppercase tracking-widest2 px-2 py-0.5">
              {percentOff}% Off
            </span>
          )}
          {lowStock && (
            <span className="rounded-full bg-paper/90 text-ink text-[9px] font-bold uppercase tracking-widest2 px-2 py-0.5">
              Low Stock
            </span>
          )}
        </div>

        {quickAddVariant && (
          <button
            type="button"
            aria-label={`Quick add ${product.title} to cart`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addLine({
                variantId: quickAddVariant.id,
                productSlug: product.slug,
                title: product.title,
                variantTitle: quickAddVariant.title,
                price: quickAddVariant.price,
                quantity: 1,
                swatch: product.swatch,
                image: quickAddVariant.image ?? product.image,
              });
            }}
            className="absolute inset-x-2 bottom-2 flex items-center justify-center gap-1.5 rounded-lg bg-paper/95 text-ink text-[11px] font-bold uppercase tracking-wide py-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-ink hover:text-paper"
          >
            <Plus size={13} strokeWidth={2.5} />
            Quick Add
          </button>
        )}

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
            className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-paper/90 text-ink shadow-soft transition-all duration-200 hover:text-flare ${
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
      <p className="eyebrow mb-0.5 text-[10px]">{product.category}</p>
      <h3 className="font-display text-sm leading-snug text-ink group-hover:text-flare transition-colors">
        {product.title}
      </h3>
      <p className="text-xs text-steel mt-0.5">{product.material}</p>
      {swatchColours.length > 1 && (
        <div className="mt-1.5 flex items-center gap-1.5">
          {swatchColours.map((tint) => (
            <span
              key={tint}
              className="h-3 w-3 rounded-full ring-1 ring-inset ring-ink/15"
              style={{ backgroundColor: tint }}
            />
          ))}
        </div>
      )}
      {product.rating != null && product.reviewCount != null && (
        <div className="mt-1.5 flex items-center gap-1">
          <Star size={11} fill="currentColor" strokeWidth={0} className="text-flare" />
          <span className="text-[11px] text-steel font-mono">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
      )}
      <div className="mt-1.5 flex items-baseline gap-2 font-mono text-xs">
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
