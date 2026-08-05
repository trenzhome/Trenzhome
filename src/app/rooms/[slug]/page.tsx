import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { rooms, getRoomBySlug } from "@/lib/rooms";
import { products } from "@/lib/products";
import { RoomHero } from "@/components/rooms/room-hero";
import { ColorPalette } from "@/components/rooms/color-palette";
import { StyleGuide } from "@/components/rooms/style-guide";
import { ProductGridOrEmpty } from "@/components/shop/product-grid-or-empty";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return {};
  return { title: `${room.name} Inspiration`, description: room.description };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const curated = products.filter((p) =>
    room.categories.some((c) => c.toLowerCase() === p.category.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <RoomHero
        name={room.name}
        tagline={room.tagline}
        description={room.description}
        swatch={room.heroSwatch}
      />

      <div className="grid md:grid-cols-2 gap-16 py-20">
        <ColorPalette palette={room.palette} />
        <StyleGuide tips={room.styleTips} />
      </div>

      <section className="pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-3">Curated for This Room</p>
            <h2 className="font-display text-3xl">Shop the {room.name}</h2>
          </div>
        </div>
        <ProductGridOrEmpty
          products={curated}
          emptyMessage={`New products for the ${room.name.toLowerCase()} are coming soon.`}
        />
      </section>

      <div className="pb-20">
        <Link href="/rooms" className="text-sm font-medium text-steel hover:text-flare transition-colors">
          &larr; Back to All Rooms
        </Link>
      </div>
    </div>
  );
}
