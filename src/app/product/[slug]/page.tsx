import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, collectionStories } from "@/lib/products";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductCard } from "@/components/product/product-card";
import { CollectionStory } from "@/components/product/collection-story";
import { ProductTabs } from "@/components/product/product-tabs";
import { FrequentlyBoughtTogether } from "@/components/product/frequently-bought-together";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const story = collectionStories[product.category];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <ProductDetail product={product} />

      <ProductTabs product={product} />

      <FrequentlyBoughtTogether product={product} companions={related.slice(0, 2)} />

      {story && <CollectionStory story={story} />}

      {related.length > 0 && (
        <section className="mt-24">
          <p className="eyebrow mb-3">Similar Products</p>
          <h2 className="font-display text-3xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed excludeSlug={product.slug} />
    </div>
  );
}
