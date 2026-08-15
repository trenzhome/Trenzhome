import { NextRequest, NextResponse } from "next/server";
import { getProductsBySlugs } from "@/lib/products";

export async function POST(req: NextRequest) {
  const { slugs }: { slugs: string[] } = await req.json();
  if (!Array.isArray(slugs) || slugs.length === 0) {
    return NextResponse.json({ products: [] });
  }
  const products = await getProductsBySlugs(slugs);
  return NextResponse.json({ products });
}
