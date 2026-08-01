# TRENZHOME

A real, working starting slice of the platform described in the brief — not a mockup.
Built with Next.js 15 (App Router), TypeScript, Tailwind, Prisma, and Stripe Checkout.

## What's actually working right now

- **Design system**: warm-linen / ink / brass palette, Fraunces (display) + Inter (body) +
  IBM Plex Mono (data/prices) type system. Signature element: material-swatch thumbnails
  instead of stock photography, since no real product photos exist yet.
- **Database schema** (`prisma/schema.prisma`): users, addresses, products, variants,
  categories, collections, reviews, wishlist, cart, orders, order items, discount codes —
  normalized, indexed, soft-delete-ready.
- **Storefront**: homepage, `/shop` catalog with category filtering, `/product/[slug]`
  detail page with variant selection and stock states.
- **Cart**: real client-side state (React Context), add/remove/update quantity, drawer UI.
- **Checkout**: `/api/checkout` creates a real Stripe Checkout Session server-side from
  the cart contents (Stripe test mode — needs your API keys).
- **Admin**: `/admin` dashboard with a live products/inventory table.

## What's mocked, and why

Product data currently lives in `src/lib/products.ts` instead of the database, so the
storefront renders real content without needing Postgres running in this environment.
Swapping it for Prisma queries is a small, mechanical change once `DATABASE_URL` is set —
the shapes already match the schema.

## Running it locally

```bash
npm install
cp .env.example .env       # fill in DATABASE_URL and Stripe keys
npx prisma migrate dev     # creates tables from schema.prisma
npm run dev
```

## Realistic next steps (in priority order)

1. Wire `src/lib/products.ts` calls over to Prisma (`prisma.product.findMany()` etc.)
2. Auth (NextAuth or Cognito) + real account pages, order history
3. Stripe webhook handler to mark orders PAID and decrement inventory
4. Search (start with Postgres full-text or Algolia before "AI search")
5. Image upload → S3 + CloudFront once real product photography exists
6. CI (GitHub Actions) + Terraform for the AWS pieces (RDS, S3, CloudFront, WAF)

This is intentionally scoped as a strong, extensible foundation rather than an attempt
at the full enterprise feature list in one pass — each item above is a focused follow-up.
