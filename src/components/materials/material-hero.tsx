import { MaterialSwatch } from "@/components/product/material-swatch";
import { Reveal } from "@/components/home/reveal";

export function MaterialHero({
  name,
  tagline,
  swatch,
}: {
  name: string;
  tagline: string;
  swatch: string;
}) {
  return (
    <section className="relative min-h-[36vh] bg-ink text-paper overflow-hidden rounded-3xl flex items-end">
      <MaterialSwatch gradient={swatch} className="absolute inset-0 h-full w-full opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
      <div className="relative z-10 px-8 md:px-14 pb-12 w-full">
        <Reveal>
          <p className="eyebrow text-paper/60 mb-3">Material Guide</p>
          <h1 className="font-display text-[1.1875rem] md:text-[1.625rem] mb-3">{name}</h1>
          <p className="text-paper/70 max-w-md">{tagline}</p>
        </Reveal>
      </div>
    </section>
  );
}
