import Image from "next/image";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { Reveal } from "@/components/home/reveal";

export function ShopHero({
  title,
  copy,
  swatch,
  image,
}: {
  title: string;
  copy: string;
  swatch: string;
  image?: string;
}) {
  return (
    <section className="relative min-h-[40vh] bg-ink text-paper overflow-hidden rounded-3xl flex items-end">
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
      ) : (
        <MaterialSwatch gradient={swatch} className="absolute inset-0 h-full w-full opacity-60" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-14 w-full">
        <Reveal>
          <p className="eyebrow text-paper/60 mb-3">Shop</p>
          <h1 className="font-display text-4xl md:text-6xl mb-4 max-w-2xl">{title}</h1>
          <p className="text-paper/70 max-w-md">{copy}</p>
        </Reveal>
      </div>
    </section>
  );
}
