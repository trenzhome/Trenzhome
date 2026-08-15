import Link from "next/link";
import Image from "next/image";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { Reveal } from "@/components/home/reveal";

export interface ShopHeroProduct {
  slug: string;
  title: string;
  price: number;
  image: string;
}

export function ShopHero({
  title,
  copy,
  swatch,
  image,
  collage = [],
}: {
  title: string;
  copy: string;
  swatch: string;
  image?: string;
  collage?: ShopHeroProduct[];
}) {
  const [main, side] = collage;

  return (
    <section className="relative min-h-[46vh] md:min-h-[52vh] bg-ink text-paper overflow-hidden rounded-3xl flex items-center">
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
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-ink/10" />
      <div
        aria-hidden
        className="absolute -left-16 bottom-0 h-[260px] w-[260px] rounded-full bg-flare/20 blur-[90px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 w-full flex items-center justify-between gap-10">
        <Reveal>
          <p className="eyebrow text-paper/60 mb-3">Shop</p>
          <h1 className="font-display text-4xl md:text-6xl mb-4 max-w-2xl">{title}</h1>
          <p className="text-paper/70 max-w-md">{copy}</p>
        </Reveal>

        {(main?.image || side?.image) && (
          <div className="relative hidden lg:block w-[240px] h-[220px] shrink-0">
            {main?.image && (
              <Link
                href={`/product/${main.slug}`}
                className="group absolute right-0 top-0 h-[190px] w-[170px] overflow-hidden rounded-2xl shadow-luxury ring-1 ring-paper/10 rotate-2 transition-transform duration-500 hover:rotate-0"
              >
                <Image
                  src={main.image}
                  alt={main.title}
                  fill
                  sizes="170px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-xs font-medium text-paper truncate">{main.title}</p>
                  <p className="text-xs font-mono text-paper/70">${main.price.toLocaleString()}</p>
                </div>
              </Link>
            )}
            {side?.image && (
              <Link
                href={`/product/${side.slug}`}
                aria-label={side.title}
                className="group absolute left-0 bottom-0 h-[120px] w-[120px] overflow-hidden rounded-xl shadow-luxury ring-2 ring-ink -rotate-3 transition-transform duration-300 hover:rotate-0 hover:scale-105"
              >
                <Image src={side.image} alt={side.title} fill sizes="120px" className="object-cover" />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
