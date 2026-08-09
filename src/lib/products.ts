import { CollectionStory, Product } from "@/types";
import { getAllProducts, getProductByHandle, shopifyConfigured } from "./shopify";
import { mockProducts } from "./mock-products";

export const collectionStories: Record<string, CollectionStory> = {
  Living: {
    title: "The Living Collection",
    copy: "Pieces built for rooms that get used, not just photographed — honest materials that take a scuff and still look right a decade in.",
  },
  Dining: {
    title: "The Dining Collection",
    copy: "One slab, one base, no filler. Every dining piece is scaled for real dinners, not just the listing photo.",
  },
  Bedding: {
    title: "The Bedding Collection",
    copy: "Certified organic fibres, washed before they ever reach you, so night one already feels broken in.",
  },
  Lighting: {
    title: "The Lighting Collection",
    copy: "Warm, diffuse, and built from solid metal — light fixtures made to be touched, not just switched on.",
  },
  "Kitchen & Dining": {
    title: "The Kitchen & Dining Collection",
    copy: "Stoneware and ceramics finished by hand, so the small variation from piece to piece is the point, not a flaw.",
  },
  Rugs: {
    title: "The Rugs Collection",
    copy: "Natural fibre underfoot — wool, jute, and flatweave, chosen for how a room actually gets walked on.",
  },
  Storage: {
    title: "The Storage Collection",
    copy: "Solid wood and woven natural fill, built to hide the everyday mess without looking like a bin.",
  },
  Curtains: {
    title: "The Curtains Collection",
    copy: "Linen that filters light instead of blocking it out, in the same weave running through the rest of the catalog.",
  },
  Cushions: {
    title: "The Cushions Collection",
    copy: "The fast way to change a room — covers, inserts, and shapes sized to fit what you already own.",
  },
};

export async function getProducts(): Promise<Product[]> {
  if (!shopifyConfigured) return mockProducts;
  try {
    return await getAllProducts();
  } catch (err) {
    // Shopify unreachable (e.g. network policy, transient outage) — degrade
    // to the mock catalog rather than taking every page down with it.
    console.error("Shopify getAllProducts failed, falling back to mock catalog:", err);
    return mockProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!shopifyConfigured) return mockProducts.find((p) => p.slug === slug);
  try {
    const product = await getProductByHandle(slug);
    return product ?? undefined;
  } catch (err) {
    console.error(`Shopify getProductByHandle(${slug}) failed, falling back to mock catalog:`, err);
    return mockProducts.find((p) => p.slug === slug);
  }
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  const unique = Array.from(new Set(slugs));
  const found = await Promise.all(unique.map((slug) => getProductBySlug(slug)));
  const bySlug = new Map(found.filter((p): p is Product => Boolean(p)).map((p) => [p.slug, p]));
  // preserve the caller's original order (most-recent-first lists, etc.)
  return slugs.map((s) => bySlug.get(s)).filter((p): p is Product => Boolean(p));
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}
