import { NextRequest, NextResponse } from "next/server";
import { createCart, shopifyConfigured } from "@/lib/shopify";

interface CheckoutLine {
  variantId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { lines }: { lines: CheckoutLine[] } = await req.json();

    if (!lines?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!shopifyConfigured) {
      return NextResponse.json(
        { error: "Checkout isn't connected to Shopify yet." },
        { status: 503 }
      );
    }

    // Shopify's Cart API builds the cart from real variant IDs and returns a
    // hosted checkoutUrl — Shopify owns payment, tax, shipping, and the
    // resulting order from here on.
    const cart = await createCart(
      lines.map((line) => ({ variantId: line.variantId, quantity: line.quantity }))
    );

    return NextResponse.json({ url: cart.checkoutUrl });
  } catch (err) {
    console.error("Shopify checkout error:", err);
    return NextResponse.json({ error: "Unable to create checkout" }, { status: 500 });
  }
}
