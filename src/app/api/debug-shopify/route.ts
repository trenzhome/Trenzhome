import { NextResponse } from "next/server";
import { getAllProducts, getProductByHandle, shopifyConfigured } from "@/lib/shopify";

export async function GET() {
  const result: Record<string, unknown> = {
    shopifyConfigured,
    domainSet: Boolean(process.env.SHOPIFY_STORE_DOMAIN),
    tokenSet: Boolean(process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN),
    domainValue: process.env.SHOPIFY_STORE_DOMAIN ?? null,
  };

  try {
    const products = await getAllProducts();
    result.getAllProductsCount = products.length;
    result.getAllProductsSample = products.slice(0, 3).map((p) => p.slug);
  } catch (err) {
    result.getAllProductsError = err instanceof Error ? err.message : String(err);
  }

  try {
    const product = await getProductByHandle("dune-jute-runner");
    result.getProductByHandleResult = product ? { slug: product.slug, title: product.title } : null;
  } catch (err) {
    result.getProductByHandleError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json(result);
}
