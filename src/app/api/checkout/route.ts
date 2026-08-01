import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Instantiated lazily (not at module scope) so `next build` doesn't require
// STRIPE_SECRET_KEY to be present at build time — only at request time.
function getStripeClient() {
  return new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia",
  });
}

interface CheckoutLine {
  variantId: string;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { lines }: { lines: CheckoutLine[] } = await req.json();

    if (!lines?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // In production: re-validate price + inventory against the DB here,
    // never trust client-submitted prices directly.
    const line_items = lines.map((line) => ({
      price_data: {
        currency: "aud",
        product_data: {
          name: `${line.title} — ${line.variantTitle}`,
          metadata: { variantId: line.variantId },
        },
        unit_amount: Math.round(line.price * 100),
      },
      quantity: line.quantity,
    }));

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ["AU", "US", "GB", "NZ"] },
      automatic_tax: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
