import Link from "next/link";
import type { Metadata } from "next";
import { Leaf, Hammer, Compass, Heart } from "lucide-react";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { getProducts } from "@/lib/products";
import { Reveal } from "@/components/home/reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Our story, mission, craftsmanship, and sustainability commitments.",
};

const NAV = [
  { id: "story", label: "Our Story" },
  { id: "mission", label: "Our Mission" },
  { id: "craftsmanship", label: "Craftsmanship" },
  { id: "sustainability", label: "Sustainability" },
];

export default async function AboutPage() {
  const products = await getProducts();
  const heroSwatch = products[0]?.swatch ?? "linear-gradient(135deg, #D9CBB5, #B8A582)";
  return (
    <div className="mx-auto max-w-[1800px] px-6 py-6">
      <p className="eyebrow mb-3">About</p>
      <h1 className="font-display text-2xl mb-6">Furnish Different</h1>

      <nav className="flex flex-wrap gap-3 mb-16">
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium hover:border-flare hover:text-flare transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <section id="story" className="scroll-mt-32 grid md:grid-cols-2 gap-14 items-center py-6 border-t border-ink/10">
        <Reveal direction="left">
          <MaterialSwatch gradient={heroSwatch} className="aspect-[4/5] rounded-2xl shadow-soft" />
        </Reveal>
        <Reveal direction="right" delay={0.1}>
          <p className="eyebrow mb-3">Our Story</p>
          <h2 className="font-display text-xl mb-5">Started with one frustration</h2>
          <p className="text-ink/80 leading-relaxed mb-4">
            We got tired of furniture that looked good in a photo and fell apart in a year — pieces
            built to be replaced rather than lived with. Trenzhome started as a bet that people would
            rather buy fewer things, made from one honest material each, than keep replacing the cheap
            version every couple of years.
          </p>
          <p className="text-ink/80 leading-relaxed">
            Every piece in our catalog is chosen for one material doing the work — a slab of travertine,
            a bolt of Belgian linen, solid brushed brass — rather than a composite trying to look like
            something it isn&rsquo;t.
          </p>
        </Reveal>
      </section>

      <section id="mission" className="scroll-mt-32 py-6 border-t border-ink/10">
        <div className="flex items-start gap-4 mb-6">
          <Compass size={22} strokeWidth={1.75} className="text-flare mt-1" />
          <h2 className="font-display text-xl">Our Mission</h2>
        </div>
        <p className="text-ink/80 leading-relaxed max-w-2xl pl-9">
          To make furniture and home goods that outlast the trend cycle — building a slower, smaller
          catalog around materials and construction that hold up, rather than chasing every seasonal
          shift in what&rsquo;s popular.
        </p>
      </section>

      <section id="craftsmanship" className="scroll-mt-32 py-6 border-t border-ink/10">
        <div className="flex items-start gap-4 mb-6">
          <Hammer size={22} strokeWidth={1.75} className="text-flare mt-1" />
          <h2 className="font-display text-xl">Craftsmanship</h2>
        </div>
        <div className="max-w-2xl pl-9 space-y-4 text-ink/80 leading-relaxed">
          <p>
            We design around a simple constraint: one material should do most of the work in every
            piece. That means solid hardwood frames instead of veneer over particleboard, honed stone
            slabs instead of laminate, and natural fibres pre-washed and finished before they&rsquo;re
            ever cut — not after a customer complains about stiffness.
          </p>
          <p>
            You can read exactly how each material is made, cared for, and sourced on our{" "}
            <Link href="/materials" className="underline hover:text-flare">Material Guides</Link>.
          </p>
        </div>
      </section>

      <section id="sustainability" className="scroll-mt-32 py-6 border-t border-ink/10">
        <div className="flex items-start gap-4 mb-6">
          <Leaf size={22} strokeWidth={1.75} className="text-flare mt-1" />
          <h2 className="font-display text-xl">Sustainability</h2>
        </div>
        <div className="max-w-2xl pl-9 space-y-4 text-ink/80 leading-relaxed">
          <p>
            The most sustainable piece of furniture is the one you don&rsquo;t have to replace. Our
            starting point is durability — a sofa that lasts fifteen years instead of three has a
            smaller footprint than almost any material certification could offset on its own.
          </p>
          <p>
            Beyond that, we favor natural, biodegradable fibres (organic cotton, linen, wool) over
            synthetic blends where the performance tradeoff makes sense, and we&rsquo;re transparent
            about where we haven&rsquo;t gotten there yet rather than overclaiming. Each material&rsquo;s
            real sustainability profile — including the tradeoffs — is on its{" "}
            <Link href="/materials" className="underline hover:text-flare">material guide page</Link>.
          </p>
        </div>
      </section>

      <section className="py-6 border-t border-ink/10">
        <div className="flex items-start gap-4 mb-4">
          <Heart size={22} strokeWidth={1.75} className="text-flare mt-1" />
          <h2 className="font-display text-xl">Work With Us</h2>
        </div>
        <div className="pl-9 flex flex-wrap gap-4">
          <Link href="/trade" className="btn-outline">Trade &amp; Wholesale</Link>
          <Link href="/careers" className="btn-outline">Careers</Link>
          <Link href="/contact" className="btn-outline">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
