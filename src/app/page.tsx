import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { MaterialSwatch } from "@/components/product/material-swatch";

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero: black block, oversized poster type, the material swatch pushed hard right
          and angled — same move sportswear drop pages make with hero product shots. */}
      <section className="relative bg-ink text-paper overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-flare mb-5">
              Drop 02 / Autumn
            </p>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.92] mb-6">
              FURNISH
              <br />
              DIFFERENT
            </h1>
            <p className="text-paper/70 text-lg max-w-md mb-9">
              No filler pieces. Every item is built from one honest material —
              a slab of travertine, a bolt of Belgian linen — and made to
              outlast the trend cycle.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-flare text-ink px-10 py-4 text-sm font-bold uppercase tracking-widest2 hover:bg-paper transition-colors"
            >
              Shop the Drop
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:-rotate-2">
            <MaterialSwatch gradient={products[0].swatch} className="aspect-[3/4] ring-4 ring-paper/10" />
            <MaterialSwatch gradient={products[1].swatch} className="aspect-[3/4] mt-8 ring-4 ring-paper/10" />
          </div>
        </div>
      </section>

      {/* Featured grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl">NEW THIS SEASON</h2>
          <Link
            href="/shop"
            className="text-sm font-bold uppercase tracking-wide border-b-2 border-ink hover:border-flare hover:text-flare transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category strip — bold color blocks, invert on hover like a sneaker-drop category grid */}
      <section className="bg-fog py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-steel mb-6">
            Shop by Room
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Living", "Bedding", "Dining", "Lighting"].map((room) => (
              <Link
                key={room}
                href={`/shop?category=${room.toLowerCase()}`}
                className="group relative flex items-center justify-center aspect-square bg-ink text-paper overflow-hidden"
              >
                <span className="absolute inset-0 bg-flare scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
                <span className="relative font-display text-2xl group-hover:text-ink transition-colors">
                  {room}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
