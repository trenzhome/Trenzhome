# TRENZHOME

A real, working storefront — not a mockup. Built with Next.js 15 (App Router), TypeScript,
Tailwind, and a headless Shopify backend (Storefront API) for catalog, cart, and checkout.

## What's actually working right now

- **Design system**: warm-linen / ink / brass palette, Fraunces (display) + Inter (body) +
  IBM Plex Mono (data/prices) type system. Editorial sections (rooms, materials, hero scenes)
  use material-swatch gradient thumbnails where no real photography exists; real Shopify
  product images are used everywhere a product actually has one.
- **Catalog**: `src/lib/shopify.ts` is a server-only Storefront API GraphQL client — products,
  variants, images, and inventory come from a real connected Shopify store. If
  `SHOPIFY_STORE_DOMAIN` / `SHOPIFY_STOREFRONT_ACCESS_TOKEN` aren't set, or the API is
  unreachable, the site falls back to a small mock catalog (`src/lib/mock-products.ts`) so it
  still runs end-to-end.
- **Storefront**: homepage, `/shop` catalog with category filtering, sort, column density, and
  a compare-products panel, `/product/[slug]` detail page with variant selection and stock
  states.
- **Cart**: client-side state (React Context) for fast add/remove/update-quantity UI.
- **Checkout**: `/api/checkout` builds a real Shopify cart from the submitted line items via the
  Storefront Cart API and returns Shopify's hosted `checkoutUrl` — Shopify owns payment, tax,
  shipping, and the resulting order from there.
- **Admin**: `/admin` dashboard with a live products/inventory table sourced from the same
  catalog.
- **Database schema** (`prisma/schema.prisma`): users, addresses, reviews, wishlist,
  discount codes, etc. — not currently wired up; product/order data now lives in Shopify
  rather than this schema.

## Running it locally

```bash
npm install
cp .env.example .env       # fill in SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN
npm run dev
```

Without Shopify credentials set, the site still runs against the mock catalog — useful for UI
work that doesn't depend on real inventory. Checkout itself requires a real Shopify connection.

### Getting a Storefront API token

In your Shopify store admin: **Sales channels → Shopify App Store → install "Headless"** (free,
official Shopify app) → **Create storefront** → **Storefront API → Manage** → the private access
token is shown there. This is a manual step in the Shopify admin UI by design — it can't be
automated by an AI agent against this codebase.

## Realistic next steps (in priority order)

1. Persist the cart as a real Shopify cart ID (cookie) instead of rebuilding it at checkout time,
   so quantity/line changes sync live instead of just at the final "Checkout" click.
2. Auth (NextAuth or Cognito) + real account pages, order history pulled from Shopify orders.
3. Wire the remaining ~10 catalog products still missing photography (see Shopify admin).
4. Search (start with Shopify's product search before "AI search").
5. CI (GitHub Actions) for build/typecheck on every push.

This is intentionally scoped as a strong, extensible foundation rather than an attempt
at the full enterprise feature list in one pass — each item above is a focused follow-up.
