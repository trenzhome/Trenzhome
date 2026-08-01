import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sale?: string }>;
}) {
  const params = await searchParams;
  let list = products;

  if (params.category) {
    list = list.filter(
      (p) => p.category.toLowerCase() === params.category!.toLowerCase()
    );
  }
  if (params.sale === "true") {
    list = list.filter((p) => p.compareAtPrice);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <p className="eyebrow mb-3">Shop</p>
      <h1 className="font-display text-5xl mb-10">
        {params.category
          ? params.category[0].toUpperCase() + params.category.slice(1)
          : "All Products"}
      </h1>

      {list.length === 0 ? (
        <p className="text-steel">No products match these filters yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
