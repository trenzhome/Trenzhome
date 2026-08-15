import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { materials, getMaterialBySlug } from "@/lib/materials";
import { getProducts } from "@/lib/products";
import { MaterialHero } from "@/components/materials/material-hero";
import { MaterialFacts } from "@/components/materials/material-facts";
import { ProductGridOrEmpty } from "@/components/shop/product-grid-or-empty";

export function generateStaticParams() {
  return materials.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) return {};
  return { title: `${material.name} Guide`, description: material.tagline };
}

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) notFound();

  const products = await getProducts();
  const recommended = material.productMatch
    ? products.filter(
        (p) =>
          p.material.toLowerCase().includes(material.productMatch!) ||
          p.materialDetail?.name.toLowerCase().includes(material.productMatch!)
      )
    : [];

  return (
    <div className="mx-auto max-w-[1800px] px-6 py-6">
      <MaterialHero name={material.name} tagline={material.tagline} swatch={material.swatch} />

      <MaterialFacts material={material} />

      <section className="pb-20">
        <p className="eyebrow mb-3">Made With {material.name}</p>
        <h2 className="font-display text-2xl mb-8">Product Recommendations</h2>
        <ProductGridOrEmpty
          products={recommended}
          emptyMessage={`We don't have a ${material.name.toLowerCase()} product in stock yet — check back soon.`}
        />
      </section>

      <div className="pb-20">
        <Link href="/materials" className="text-sm font-medium text-steel hover:text-flare transition-colors">
          &larr; Back to All Materials
        </Link>
      </div>
    </div>
  );
}
