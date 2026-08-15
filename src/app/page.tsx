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
      if (picks.length >= 4) break;
      if (seenCategories.has(p.category)) continue;
      seenCategories.add(p.category);
      picks.push(p);
    }
    for (const p of withImages) {
      if (picks.length >= 4) break;
      if (!picks.includes(p)) picks.push(p);
    }
    return picks.map((p) => ({ slug: p.slug, title: p.title, price: p.basePrice, image: p.image }));
  })();

  return (
    <>
      <Hero swatch={products[0]?.swatch} featured={heroFeatured} />

      {/* Featured collections */}
      <section className="py-[1.5rem] md:py-[1.75rem]">
        <div className="mx-auto max-w-[1800px] px-6">
          <Reveal>
            <p className="eyebrow mb-2">Shop by Room</p>
            <h2 className="font-display text-[1.125rem] md:text-[1.375rem] mb-8 max-w-lg">
              Every room, one point of view
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          {ROOMS.map((room, i) => (
            <Reveal key={room.category} delay={i * 0.08}>
              <Link
                href={`/shop?category=${room.category}`}
                className="group relative block aspect-[3/4] overflow-hidden shadow-soft hover:shadow-luxury transition-shadow duration-500"
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
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
                  <span className="font-display text-base text-paper">{room.label}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/90 text-ink text-xs opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
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
      <section className="bg-fog py-[1.5rem] md:py-[1.75rem]">
        <div className="mx-auto max-w-[1800px] px-6">
          <Reveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="eyebrow mb-2">Curated</p>
                <h2 className="font-display text-[1.125rem] md:text-[1.375rem]">New This Season</h2>
              </div>
              <Link href="/shop" className="btn-outline hidden sm:inline-flex">
                View all
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial / lifestyle sections */}
      <section className="mx-auto max-w-[1800px] px-6 py-[1.5rem] md:py-[1.75rem] space-y-8 md:space-y-10">
        {Object.entries(collectionStories)
          .slice(0, 2)
          .map(([category, story], i) => {
            const categoryProducts = products.filter((p) => p.category === category && p.image);
            const [storyProduct, accentProduct] = [
              categoryProducts[0] ?? products[i * 2] ?? products[0],
              categoryProducts[1],
            ];
            return (
            <div
              key={story.title}
              className={`grid md:grid-cols-2 gap-4 md:gap-8 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal direction={i % 2 === 1 ? "right" : "left"}>
                <div className="relative h-[320px] md:h-[360px] max-w-sm mx-auto md:mx-0">
                  {storyProduct?.image ? (
                    <div className="absolute left-0 top-0 h-full w-[68%] rounded-2xl shadow-soft overflow-hidden">
                      <Image
                        src={storyProduct.image}
                        alt={storyProduct.title}
                        fill
                        sizes="280px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <MaterialSwatch
                      gradient={storyProduct?.swatch ?? products[0]?.swatch}
                      className="absolute left-0 top-0 h-full w-[68%] rounded-2xl shadow-soft"
                    />
                  )}
                  {accentProduct?.image && (
                    <Link
                      href={`/product/${accentProduct.slug}`}
                      className="group absolute right-0 bottom-0 h-[58%] w-[42%] rounded-xl shadow-luxury ring-4 ring-paper overflow-hidden"
                    >
                      <Image
                        src={accentProduct.image}
                        alt={accentProduct.title}
                        fill
                        sizes="180px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  )}
                </div>
              </Reveal>
              <Reveal direction={i % 2 === 1 ? "left" : "right"} delay={0.1}>
                <p className="eyebrow mb-2">Editorial</p>
                <h3 className="font-display text-[1.125rem] md:text-[1.375rem] mb-3">{story.title}</h3>
                <p className="text-steel text-sm leading-relaxed max-w-md mb-5">{story.copy}</p>
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
