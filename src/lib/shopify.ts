import type { Product, ProductVariant } from "@/types";

const API_VERSION = "2026-07";
const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const shopifyConfigured = Boolean(DOMAIN && TOKEN);

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      "Shopify Storefront API is not configured — set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN."
    );
  }

  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // This is the private (server-side) token, which Shopify authenticates
      // via a different header than the public/client token — sending it as
      // X-Shopify-Storefront-Access-Token gets a silent 401 Unauthorized.
      "Shopify-Storefront-Private-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`Shopify Storefront API error: ${json.errors[0].message}`);
  }
  return json.data as T;
}

// The real catalog was seeded with a "category" tag from this exact set,
// alongside separate material/finish tags — pulling it out here is how we
// recover the site's Living/Dining/Bedding/etc. taxonomy from Shopify tags.
const KNOWN_CATEGORIES = [
  "Living",
  "Dining",
  "Bedding",
  "Lighting",
  "Kitchen & Dining",
  "Rugs",
  "Storage",
  "Curtains",
  "Cushions",
  "Bath",
  "Decor",
];

// Colour words that appear in this catalog's variant options, mapped to a
// swatch-dot hex so the existing colour-dot UI keeps working with real data.
const COLOR_TINTS: Record<string, string> = {
  Oat: "#D9CBB5",
  Charcoal: "#3A3833",
  Ivory: "#EFE9DD",
  Stone: "#B7AC98",
  Clay: "#DCCFB4",
  Sage: "#A8B79A",
  White: "#FBF9F5",
  "Dove Grey": "#B9B7B2",
  Blush: "#E8C9C6",
  Navy: "#22304A",
  "Heather Grey": "#A9A9A6",
  Emerald: "#1F4D3C",
  "Brushed Brass": "#C8A876",
  "Blackened Brass": "#2E2A24",
  "Natural Oak": "#C8A876",
  "Smoked Oak": "#6B5A46",
};

function tintFor(value: string): string | undefined {
  if (COLOR_TINTS[value]) return COLOR_TINTS[value];
  const firstSegment = value.split("/")[0]?.trim();
  return firstSegment ? COLOR_TINTS[firstSegment] : undefined;
}

// A neutral fallback gradient for the ~30% of the catalog still missing a
// real product photo — same "material swatch" convention used everywhere
// else on the site, just generated from a hash of the handle for variety.
const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #D9CBB5, #B8A582)",
  "linear-gradient(135deg, #E5DFD3, #C7BBA6)",
  "linear-gradient(135deg, #EFE9DD, #D2C6AE)",
  "linear-gradient(135deg, #F1EADC, #DCCFB4)",
  "linear-gradient(135deg, #C8A876, #8F6F41)",
];

function fallbackSwatch(handle: string): string {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) hash = (hash * 31 + handle.charCodeAt(i)) >>> 0;
  return FALLBACK_GRADIENTS[hash % FALLBACK_GRADIENTS.length];
}

interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

interface ShopifyVariantNode {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariantNode }[] };
}

function mapVariant(node: ShopifyVariantNode): ProductVariant {
  const optionValues: Record<string, string> = {};
  let tint: string | undefined;
  for (const opt of node.selectedOptions) {
    optionValues[opt.name.toLowerCase()] = opt.value;
    if (!tint && /colou?r|finish/i.test(opt.name)) tint = tintFor(opt.value);
  }
  return {
    id: node.id,
    title: node.title,
    price: Number(node.price.amount),
    compareAtPrice: node.compareAtPrice ? Number(node.compareAtPrice.amount) : undefined,
    optionValues,
    inventory: node.availableForSale ? Math.max(node.quantityAvailable ?? 0, node.quantityAvailable === 0 ? 0 : 1) : 0,
    tint,
    image: node.image?.url,
  };
}

function mapProduct(node: ShopifyProductNode): Product {
  const tagSet = new Set(node.tags);
  const category =
    KNOWN_CATEGORIES.find((c) => tagSet.has(c)) || node.productType || "Home";
  const material = node.tags.filter((t) => !KNOWN_CATEGORIES.includes(t)).join(", ");
  const variants = node.variants.edges.map((e) => mapVariant(e.node));
  const basePrice = Math.min(...variants.map((v) => v.price));
  const compareAtPrice = variants.find((v) => v.compareAtPrice)?.compareAtPrice;
  const images = node.images.edges.map((e) => e.node.url);

  return {
    id: node.id,
    slug: node.handle,
    title: node.title,
    category,
    description: node.description,
    material: material || node.productType || "",
    basePrice,
    compareAtPrice,
    swatch: fallbackSwatch(node.handle),
    image: node.featuredImage?.url ?? images[0],
    images,
    variants,
  };
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  productType
  tags
  featuredImage { url altText width height }
  images(first: 8) { edges { node { url altText width height } } }
  variants(first: 25) {
    edges {
      node {
        id
        title
        sku
        availableForSale
        quantityAvailable
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
        image { url altText width height }
      }
    }
  }
`;

export async function getAllProducts(): Promise<Product[]> {
  const products: Product[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data: {
      products: {
        edges: { node: ShopifyProductNode }[];
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
      };
    } = await shopifyFetch(
      `query Products($first: Int!, $after: String) {
        products(first: $first, after: $after, sortKey: TITLE) {
          edges { node { ${PRODUCT_FIELDS} } }
          pageInfo { hasNextPage endCursor }
        }
      }`,
      { first: 100, after }
    );

    products.push(...data.products.edges.map((e) => mapProduct(e.node)));
    hasNextPage = data.products.pageInfo.hasNextPage;
    after = data.products.pageInfo.endCursor;
  }

  return products;
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data: { product: ShopifyProductNode | null } = await shopifyFetch(
    `query ProductByHandle($handle: String!) {
      product(handle: $handle) { ${PRODUCT_FIELDS} }
    }`,
    { handle }
  );
  return data.product ? mapProduct(data.product) : null;
}

// ---- Cart ----

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  price: number;
  image?: string;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  totalAmount: number;
  currencyCode: string;
  lines: ShopifyCartLine[];
}

interface ShopifyCartNode {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { totalAmount: ShopifyMoney };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          price: ShopifyMoney;
          image: ShopifyImage | null;
          product: { title: string; handle: string };
        };
      };
    }[];
  };
}

function mapCart(node: ShopifyCartNode): ShopifyCart {
  return {
    id: node.id,
    checkoutUrl: node.checkoutUrl,
    totalQuantity: node.totalQuantity,
    totalAmount: Number(node.cost.totalAmount.amount),
    currencyCode: node.cost.totalAmount.currencyCode,
    lines: node.lines.edges.map((e) => ({
      id: e.node.id,
      quantity: e.node.quantity,
      variantId: e.node.merchandise.id,
      productHandle: e.node.merchandise.product.handle,
      title: e.node.merchandise.product.title,
      variantTitle: e.node.merchandise.title,
      price: Number(e.node.merchandise.price.amount),
      image: e.node.merchandise.image?.url,
    })),
  };
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost { totalAmount { amount currencyCode } }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            image { url altText width height }
            product { title handle }
          }
        }
      }
    }
  }
`;

export interface CartLineInput {
  variantId: string;
  quantity: number;
}

export async function createCart(lines: CartLineInput[]): Promise<ShopifyCart> {
  const data: { cartCreate: { cart: ShopifyCartNode; userErrors: { message: string }[] } } =
    await shopifyFetch(
      `mutation CartCreate($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart { ${CART_FIELDS} }
          userErrors { field message }
        }
      }`,
      { lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity })) }
    );
  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }
  return mapCart(data.cartCreate.cart);
}

export async function addCartLines(cartId: string, lines: CartLineInput[]): Promise<ShopifyCart> {
  const data: { cartLinesAdd: { cart: ShopifyCartNode; userErrors: { message: string }[] } } =
    await shopifyFetch(
      `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${CART_FIELDS} }
          userErrors { field message }
        }
      }`,
      { cartId, lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity })) }
    );
  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }
  return mapCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data: { cartLinesUpdate: { cart: ShopifyCartNode; userErrors: { message: string }[] } } =
    await shopifyFetch(
      `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${CART_FIELDS} }
          userErrors { field message }
        }
      }`,
      { cartId, lines }
    );
  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }
  return mapCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data: { cartLinesRemove: { cart: ShopifyCartNode; userErrors: { message: string }[] } } =
    await shopifyFetch(
      `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${CART_FIELDS} }
          userErrors { field message }
        }
      }`,
      { cartId, lineIds }
    );
  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }
  return mapCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data: { cart: ShopifyCartNode | null } = await shopifyFetch(
    `query GetCart($cartId: ID!) { cart(id: $cartId) { ${CART_FIELDS} } }`,
    { cartId }
  );
  return data.cart ? mapCart(data.cart) : null;
}
