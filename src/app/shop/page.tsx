import { products, collectionStories } from "@/lib/products";
import { ShopHero } from "@/components/shop/shop-hero";
import { CategoryRail } from "@/components/shop/category-rail";
import { ShopBrowser } from "@/components/shop/shop-browser";
import { BuyingGuide } from "@/components/shop/buying-guide";
import { ShopFaqs } from "@/components/shop/shop-faqs";
import { RelatedCollections } from "@/components/shop/related-collections";
import { CollectionStory } from "@/components/product/collection-story";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    sale?: string;
    q?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const params = await searchParams;
  let list = products;

  if (params.category) {
    list = list.filter((p) => p.category.toLowerCase() === params.category!.toLowerCase());
  }
  if (params.sale === "true") {
    list = list.filter((p) => p.compareAtPrice);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  if (params.minPrice) {
    list = list.filter((p) => p.basePrice >= Number(params.minPrice));
  }
  if (params.maxPrice) {
    list = list.filter((p) => p.basePrice <= Number(params.maxPrice));
  }

  list = [...list];
  switch (params.sort) {
    case "new":
      list.reverse();
      break;
    case "price-asc":
      list.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case "price-desc":
      list.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
  }

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const priceBounds = {
    min: Math.min(...products.map((p) => p.basePrice)),
    max: Math.max(...products.map((p) => p.basePrice)),
  };

  const matchedCategoryKey = params.category
    ? Object.keys(collectionStories).find((k) => k.toLowerCase() === params.category!.toLowerCase())
    : undefined;
  const story = matchedCategoryKey ? collectionStories[matchedCategoryKey] : undefined;

  const heroTitle = story?.title ?? (params.q ? `Results for "${params.q}"` : "All Products");
  const heroCopy =
    story?.copy ??
    "Furniture and home goods built from honest materials, made to outlast the trend cycle.";
  const heroSwatch = list[0]?.swatch ?? products[0].swatch;

  const relatedCollections = categories
    .filter((c) => c.toLowerCase() !== params.category?.toLowerCase())
    .slice(0, 4)
    .map((category) => ({
      category,
      swatch: products.find((p) => p.category === category)?.swatch ?? products[0].swatch,
    }));

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <ShopHero title={heroTitle} copy={heroCopy} swatch={heroSwatch} />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-12">
        <CategoryRail categories={categories} activeCategory={params.category} />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <ShopBrowser
          products={list}
          categories={categories}
          activeCategory={params.category}
          priceBounds={priceBounds}
        />
      </div>

      {story && <CollectionStory story={story} />}

      <BuyingGuide />
      <RelatedCollections collections={relatedCollections} />
      <ShopFaqs />
    </>
  );
}
