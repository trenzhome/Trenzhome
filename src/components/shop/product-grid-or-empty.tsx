import Link from "next/link";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/product-card";

export function ProductGridOrEmpty({
  products,
  emptyMessage,
}: {
  products: Product[];
  emptyMessage: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 px-8 py-6 text-center">
        <p className="text-steel mb-4">{emptyMessage}</p>
        <Link href="/shop" className="btn-outline">
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
