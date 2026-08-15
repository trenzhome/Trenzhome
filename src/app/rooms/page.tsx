import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { rooms } from "@/lib/rooms";
import { getProducts } from "@/lib/products";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { Reveal } from "@/components/home/reveal";

export const metadata: Metadata = {
  title: "Room Inspiration",
  description: "Design inspiration, color palettes, and style guides for every room in your home.",
};

export default async function RoomsIndexPage() {
  const products = await getProducts();
  const imageFor = (categories: string[]) =>
    products.find((p) => categories.includes(p.category) && p.image)?.image;

  return (
    <div className="mx-auto max-w-[1800px] px-6 py-16">
      <p className="eyebrow mb-3">Inspiration</p>
      <h1 className="font-display text-5xl mb-4">Shop by Room</h1>
      <p className="text-steel max-w-lg mb-14">
        Design inspiration, curated palettes, and style guidance for every room in the house.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, i) => {
          const image = imageFor(room.categories);
          return (
            <Reveal key={room.slug} delay={i * 0.05}>
              <Link
                href={`/rooms/${room.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-soft hover:shadow-luxury transition-shadow duration-500"
              >
                {image ? (
                  <Image
                    src={image}
                    alt={room.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <MaterialSwatch
                    gradient={room.heroSwatch}
                    className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-paper/60 text-xs uppercase tracking-widest2 font-mono mb-2">
                    {room.tagline}
                  </p>
                  <span className="font-display text-2xl text-paper">{room.name}</span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
