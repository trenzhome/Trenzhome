import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { MaterialSwatch } from "./material-swatch";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.compareAtPrice && product.compareAtPrice > product.basePrice;
  const lowStock = product.variants.some((v) => v.inventory > 0 && v.inventory <= 4);

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-2xl shadow-soft transition-shadow duration-500 group-hover:shadow-luxury">
        <MaterialSwatch
          gradient={product.swatch}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {onSale && (
            <span className="rounded-full bg-flare text-paper text-[10px] font-bold uppercase tracking-widest2 px-2.5 py-1">
              Sale
            </span>
          )}
          {lowStock && (
            <span className="rounded-full bg-paper/90 text-ink text-[10px] font-bold uppercase tracking-widest2 px-2.5 py-1">
              Low Stock
            </span>
          )}
        </div>
      </div>
      <p className="eyebrow mb-1">{product.category}</p>
      <h3 className="font-display text-lg leading-snug text-ink group-hover:text-flare transition-colors">
        {product.title}
      </h3>
      <p className="text-sm text-steel mt-1">{product.material}</p>
      <div className="mt-2 flex items-center gap-1">
        <Star size={13} fill="currentColor" strokeWidth={0} className="text-flare" />
        <span className="text-xs text-steel font-mono">
          {product.rating} ({product.reviewCount})
        </span>
      </div>
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
