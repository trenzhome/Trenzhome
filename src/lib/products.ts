import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "p1",
    slug: "harlow-linen-sofa",
    title: "Harlow Linen Sofa",
    category: "Living",
    material: "Belgian linen, oak frame",
    description:
      "A low, wide-armed sofa built on a solid oak frame and upholstered in pre-washed Belgian linen. The cushions are a down-and-foam blend that softens with use rather than collapsing.",
    basePrice: 3290,
    compareAtPrice: 3890,
    swatch: "linear-gradient(135deg, #D9CBB5, #B8A582)",
    variants: [
      { id: "v1", title: "Oat / 3-Seat", price: 3290, optionValues: { colour: "Oat", size: "3-Seat" }, inventory: 6 },
      { id: "v2", title: "Charcoal / 3-Seat", price: 3290, optionValues: { colour: "Charcoal", size: "3-Seat" }, inventory: 3 },
      { id: "v3", title: "Oat / 2-Seat", price: 2690, optionValues: { colour: "Oat", size: "2-Seat" }, inventory: 9 },
    ],
    rating: 4.8,
    reviewCount: 214,
  },
  {
    id: "p2",
    slug: "amara-stone-dining-table",
    title: "Amara Stone Dining Table",
    category: "Dining",
    material: "Honed travertine, blackened steel",
    description:
      "A honed travertine top set on a blackened steel base. Each slab carries natural veining, so no two tables read exactly alike.",
    basePrice: 2480,
    swatch: "linear-gradient(135deg, #E5DFD3, #C7BBA6)",
    variants: [
      { id: "v4", title: "Round / 120cm", price: 2480, optionValues: { shape: "Round", size: "120cm" }, inventory: 4 },
      { id: "v5", title: "Oval / 200cm", price: 3180, optionValues: { shape: "Oval", size: "200cm" }, inventory: 2 },
    ],
    rating: 4.9,
    reviewCount: 88,
  },
  {
    id: "p3",
    slug: "wren-organic-cotton-duvet",
    title: "Wren Organic Cotton Duvet Set",
    category: "Bedding",
    material: "GOTS-certified organic cotton sateen",
    description:
      "300-thread-count sateen woven from GOTS-certified organic cotton, stonewashed for a soft, lived-in hand-feel from the first night.",
    basePrice: 249,
    compareAtPrice: 299,
    swatch: "linear-gradient(135deg, #F1EADC, #DCCFB4)",
    variants: [
      { id: "v6", title: "Clay / Queen", price: 249, optionValues: { colour: "Clay", size: "Queen" }, inventory: 24 },
      { id: "v7", title: "Sage / Queen", price: 249, optionValues: { colour: "Sage", size: "Queen" }, inventory: 17 },
      { id: "v8", title: "Clay / King", price: 279, optionValues: { colour: "Clay", size: "King" }, inventory: 12 },
    ],
    rating: 4.7,
    reviewCount: 601,
  },
  {
    id: "p4",
    slug: "moraine-brass-pendant",
    title: "Moraine Brass Pendant",
    category: "Lighting",
    material: "Solid brushed brass, opal glass",
    description:
      "A single opal-glass globe suspended from a solid brushed-brass rod. Casts a warm, diffuse light that's kind to a dining room at night.",
    basePrice: 380,
    swatch: "linear-gradient(135deg, #C8A876, #8F6F41)",
    variants: [
      { id: "v9", title: "Brushed Brass", price: 380, optionValues: { finish: "Brushed Brass" }, inventory: 15 },
      { id: "v10", title: "Blackened Brass", price: 410, optionValues: { finish: "Blackened Brass" }, inventory: 8 },
    ],
    rating: 4.6,
    reviewCount: 132,
  },
  {
    id: "p5",
    slug: "isla-boucle-armchair",
    title: "Isla Bouclé Armchair",
    category: "Living",
    material: "Ivory bouclé, beechwood legs",
    description:
      "A compact, curved-back armchair upholstered in a dense ivory bouclé, set on turned beechwood legs. Scaled for reading corners and small living rooms alike.",
    basePrice: 890,
    swatch: "linear-gradient(135deg, #EFE9DD, #D2C6AE)",
    variants: [
      { id: "v11", title: "Ivory", price: 890, optionValues: { colour: "Ivory" }, inventory: 11 },
      { id: "v12", title: "Stone", price: 890, optionValues: { colour: "Stone" }, inventory: 6 },
    ],
    rating: 4.9,
    reviewCount: 97,
  },
  {
    id: "p6",
    slug: "basalt-ceramic-dinnerware-set",
    title: "Basalt Ceramic Dinnerware Set (16pc)",
    category: "Kitchen & Dining",
    material: "Reactive-glaze stoneware",
    description:
      "A 16-piece stoneware set finished in a reactive charcoal glaze, so each plate carries subtle variation in tone. Dishwasher and microwave safe.",
    basePrice: 195,
    swatch: "linear-gradient(135deg, #4A4842, #26241F)",
    variants: [
      { id: "v13", title: "16-Piece Set", price: 195, optionValues: { size: "16-Piece" }, inventory: 30 },
    ],
    rating: 4.8,
    reviewCount: 340,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
