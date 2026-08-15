import { MaterialSwatch } from "@/components/product/material-swatch";
import { Reveal } from "@/components/home/reveal";
import { FloatingCard, type HeroProduct } from "@/components/home/hero";

export function ShopHero({
  title,
  copy,
  swatch,
  collage = [],
}: {
  title: string;
  copy: string;
  swatch: string;
  collage?: HeroProduct[];
}) {
  const [main, side1, side2] = collage;

  return (
    <section className="relative min-h-[24vh] md:min-h-[26vh] bg-ink text-paper overflow-hidden rounded-2xl flex items-center">
      <MaterialSwatch
        gradient="linear-gradient(135deg, #2B2823 0%, #161512 55%, #0D0C0A 100%)"
        className="absolute -inset-10 h-[calc(100%+80px)] w-[calc(100%+80px)]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div
        aria-hidden
        className="absolute -left-16 bottom-0 h-[200px] w-[200px] rounded-full bg-flare/20 blur-[80px]"
      />

      <div className="absolute inset-y-0 right-0 hidden md:block w-[30%] lg:w-[26%]">
        <FloatingCard
          product={main}
          rotate={-3}
          delay={0.1}
          priority
          imgSize="(min-width: 1024px) 260px, 220px"
          className="absolute right-[8%] top-[14%] h-[46%] w-[62%]"
        />
        <FloatingCard
          product={side1}
          rotate={6}
          delay={0.5}
          imgSize="150px"
          className="absolute left-[2%] top-[8%] h-[26%] w-[34%]"
        />
        <FloatingCard
          product={side2}
          rotate={-6}
          delay={0.9}
          imgSize="170px"
          className="absolute right-[2%] bottom-[10%] h-[30%] w-[38%]"
        />
        {!main?.image && (
          <MaterialSwatch
            gradient={swatch}
            className="absolute right-[8%] top-[20%] h-[45%] w-[55%] rounded-2xl shadow-luxury ring-1 ring-paper/10 -rotate-3"
          />
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-[1800px] px-6 py-5 w-full">
        <Reveal>
          <p className="eyebrow text-paper/60 mb-1.5">Shop</p>
          <h1 className="font-display text-xl md:text-2xl mb-2 max-w-2xl">{title}</h1>
          <p className="text-paper/70 text-xs max-w-md">{copy}</p>
        </Reveal>
      </div>
    </section>
  );
}
