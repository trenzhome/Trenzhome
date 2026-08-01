import Link from "next/link";
import { Product } from "@/types";
import { MaterialSwatch } from "./material-swatch";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.compareAtPrice && product.compareAtPrice > product.basePrice;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] mb-4">
        <MaterialSwatch
          gradient={product.swatch}
          className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
        {onSale && (
          <span className="absolute left-3 top-3 bg-flare text-ink text-[11px] font-bold uppercase tracking-widest2 px-2 py-1">
            Sale
          </span>
        )}
      </div>
      <p className="eyebrow mb-1">{product.category}</p>
      <h3 className="font-display text-lg leading-snug text-ink group-hover:text-flare transition-colors">
        {product.title}
      </h3>
      <p className="text-sm text-steel mt-1">{product.material}</p>
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
