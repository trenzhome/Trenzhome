import Link from "next/link";
import Image from "next/image";
import { getProducts, collectionStories } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { Hero } from "@/components/home/hero";
import { Reveal } from "@/components/home/reveal";
import { ShopTheLook } from "@/components/home/shop-the-look";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();
  const byCategory = (category: string) => products.find((p) => p.category === category);
  const bySwatch = (category: string) => byCategory(category)?.swatch ?? products[0]?.swatch;
  const byImage = (category: string) =>
    products.find((p) => p.category === category && p.image)?.image;

  const ROOMS = [
    { label: "Living Room", category: "living", swatch: bySwatch("Living"), image: byImage("Living") },
    { label: "Bedroom", category: "bedding", swatch: bySwatch("Bedding"), image: byImage("Bedding") },
    { label: "Dining Room", category: "dining", swatch: bySwatch("Dining"), image: byImage("Dining") },
    { label: "Lighting", category: "lighting", swatch: bySwatch("Lighting"), image: byImage("Lighting") },
  ];

  const featured = products.slice(0, 4);

  const heroFeatured = (() => {
    const withImages = products.filter((p) => p.image);
    const seenCategories = new Set<string>();
    const picks = [];
    for (const p of withImages) {
      if (picks.length >= 3) break;
      if (seenCategories.has(p.category)) continue;
      seenCategories.add(p.category);
      picks.push(p);
    }
    for (const p of withImages) {
      if (picks.length >= 3) break;
      if (!picks.includes(p)) picks.push(p);
    }
    return picks.map((p) => ({ slug: p.slug, title: p.title, price: p.basePrice, image: p.image }));
  })();

  return (
    <>
      <Hero swatch={products[0]?.swatch} featured={heroFeatured} />

      {/* Featured collections */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal>
          <p className="eyebrow mb-3">Shop by Room</p>
          <h2 className="font-display text-3xl md:text-4xl mb-12 max-w-lg">
            Every room, one point of view
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROOMS.map((room, i) => (
            <Reveal key={room.category} delay={i * 0.08}>
              <Link
                href={`/shop?category=${room.category}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-soft hover:shadow-luxury transition-shadow duration-500"
              >
                {room.image ? (
                  <Image
                    src={room.image}
                    alt={room.label}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="absolute inset-0 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <MaterialSwatch
                    gradient={room.swatch}
                    className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between">
                  <span className="font-display text-xl text-paper">{room.label}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink text-sm opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    &rarr;
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ShopTheLook products={products} />

      {/* Featured products */}
      <section className="bg-fog py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="eyebrow mb-3">Curated</p>
                <h2 className="font-display text-3xl md:text-4xl">New This Season</h2>
              </div>
              <Link href="/shop" className="btn-outline hidden sm:inline-flex">
                View all
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial / lifestyle sections */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32 space-y-24 md:space-y-32">
        {Object.entries(collectionStories)
          .slice(0, 2)
          .map(([category, story], i) => {
            const storyProduct =
              products.find((p) => p.category === category && p.image) ?? products[i * 2] ?? products[0];
            return (
            <div
              key={story.title}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal direction={i % 2 === 1 ? "right" : "left"}>
                {storyProduct?.image ? (
                  <div className="relative aspect-[4/5] rounded-2xl shadow-soft overflow-hidden">
                    <Image
                      src={storyProduct.image}
                      alt={storyProduct.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <MaterialSwatch
                    gradient={storyProduct?.swatch ?? products[0]?.swatch}
                    className="aspect-[4/5] rounded-2xl shadow-soft"
                  />
                )}
              </Reveal>
              <Reveal direction={i % 2 === 1 ? "left" : "right"} delay={0.1}>
                <p className="eyebrow mb-3">Editorial</p>
                <h3 className="font-display text-3xl md:text-4xl mb-5">{story.title}</h3>
                <p className="text-steel text-lg leading-relaxed max-w-md mb-8">{story.copy}</p>
                <Link href="/shop" className="btn-flare">
                  Explore the Collection
                </Link>
              </Reveal>
            </div>
            );
          })}
      </section>

      <Testimonials />

      <Newsletter />
    </>
  );
}
