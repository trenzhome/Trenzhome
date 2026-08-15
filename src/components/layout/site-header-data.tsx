import { getProducts } from "@/lib/products";
import { SiteHeader } from "./site-header";

const CATEGORIES = ["Living", "Dining", "Bedding", "Lighting", "Kitchen & Dining"];

// Server-side wrapper so the (client) header's mega-menu imagery can use
// real catalog swatches without making the whole root layout depend on a
// live Shopify fetch for every route.
export async function SiteHeaderData() {
  const products = await getProducts();
  const categorySwatches: Record<string, string> = {};
  for (const category of CATEGORIES) {
    const swatch = products.find((p) => p.category === category)?.swatch;
    if (swatch) categorySwatches[category] = swatch;
  }
  const roomsPromoSwatch = products.find((p) => p.category === "Living")?.swatch;

  return <SiteHeader categorySwatches={categorySwatches} roomsPromoSwatch={roomsPromoSwatch} />;
}
