import Image from "next/image";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { Reveal } from "@/components/home/reveal";

export function RoomHero({
  name,
  tagline,
  description,
  swatch,
  image,
}: {
  name: string;
  tagline: string;
  description: string;
  swatch: string;
  image?: string;
}) {
  return (
    <section className="relative min-h-[46vh] bg-ink text-paper overflow-hidden rounded-3xl flex items-end">
      {image ? (
        <Image src={image} alt={name} fill sizes="100vw" className="absolute inset-0 object-cover opacity-70" />
      ) : (
        <MaterialSwatch gradient={swatch} className="absolute inset-0 h-full w-full opacity-60" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      <div className="relative z-10 px-8 md:px-14 pb-14 w-full">
        <Reveal>
          <p className="eyebrow text-paper/60 mb-3">{tagline}</p>
          <h1 className="font-display text-[1.1875rem] md:text-[1.625rem] mb-4 max-w-2xl">{name}</h1>
          <p className="text-paper/70 max-w-lg leading-relaxed">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
