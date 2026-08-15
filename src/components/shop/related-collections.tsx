import Link from "next/link";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { Reveal } from "@/components/home/reveal";

export function RelatedCollections({
  collections,
}: {
  collections: { category: string; swatch: string }[];
}) {
  if (collections.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1800px] px-6 py-12">
      <p className="eyebrow mb-3">Explore More</p>
      <h2 className="font-display text-2xl md:text-3xl mb-10">Related Collections</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {collections.map((c, i) => (
          <Reveal key={c.category} delay={i * 0.06}>
            <Link
              href={`/shop?category=${encodeURIComponent(c.category.toLowerCase())}`}
              className="group relative block aspect-square overflow-hidden rounded-2xl shadow-soft hover:shadow-luxury transition-shadow duration-500"
            >
              <MaterialSwatch
                gradient={c.swatch}
                className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 font-display text-lg text-paper">
                {c.category}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
