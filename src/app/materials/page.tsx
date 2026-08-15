import Link from "next/link";
import type { Metadata } from "next";
import { materials } from "@/lib/materials";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { Reveal } from "@/components/home/reveal";

export const metadata: Metadata = {
  title: "Material Guides",
  description: "Benefits, manufacturing, sustainability, and care guides for every material we work with.",
};

export default function MaterialsIndexPage() {
  return (
    <div className="mx-auto max-w-[1800px] px-6 py-10">
      <p className="eyebrow mb-3">Education</p>
      <h1 className="font-display text-3xl mb-4">Material Guides</h1>
      <p className="text-steel max-w-lg mb-14">
        What each material is, how it's made, and how to care for it — so you can buy for the fibre, not just the photo.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {materials.map((material, i) => (
          <Reveal key={material.slug} delay={i * 0.05}>
            <Link
              href={`/materials/${material.slug}`}
              className="group relative block aspect-square overflow-hidden rounded-2xl shadow-soft hover:shadow-luxury transition-shadow duration-500"
            >
              <MaterialSwatch
                gradient={material.swatch}
                className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-5 font-display text-xl text-paper">
                {material.name}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
