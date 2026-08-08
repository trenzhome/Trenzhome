import { Product, CollectionStory } from "@/types";

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
      { id: "v1", title: "Oat / 3-Seat", price: 3290, optionValues: { colour: "Oat", size: "3-Seat" }, inventory: 6, tint: "#D9CBB5" },
      { id: "v2", title: "Charcoal / 3-Seat", price: 3290, optionValues: { colour: "Charcoal", size: "3-Seat" }, inventory: 3, tint: "#3A3833" },
      { id: "v3", title: "Oat / 2-Seat", price: 2690, optionValues: { colour: "Oat", size: "2-Seat" }, inventory: 9, tint: "#D9CBB5" },
    ],
    rating: 4.8,
    reviewCount: 214,
    hotspots: [
      { id: "h1", x: 28, y: 40, label: "Frame", description: "Solid oak, kiln-dried to resist warping." },
      { id: "h2", x: 62, y: 55, label: "Upholstery", description: "Pre-washed Belgian linen, softens with wear." },
      { id: "h3", x: 50, y: 78, label: "Cushions", description: "Down-and-foam blend that keeps its shape." },
    ],
    materialDetail: {
      name: "Pre-washed Belgian linen",
      texture: "Loose plain weave with a dry, slightly slubby hand-feel.",
      craft: "Woven in Belgium from long-line flax fibre, then washed for softness before cutting.",
      care: "Vacuum weekly; spot-clean with cold water; professional upholstery clean once a year.",
    },
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
    hotspots: [
      { id: "h4", x: 50, y: 35, label: "Top", description: "Honed travertine slab, natural veining." },
      { id: "h5", x: 50, y: 82, label: "Base", description: "Blackened steel, powder-coated for durability." },
    ],
    materialDetail: {
      name: "Honed travertine",
      texture: "Matte, stone-cool surface with visible mineral veining.",
      craft: "Quarried slabs are honed flat, then sealed to resist etching from acidic spills.",
      care: "Wipe with a damp cloth; reseal annually; avoid prolonged contact with citrus or vinegar.",
    },
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
      { id: "v6", title: "Clay / Queen", price: 249, optionValues: { colour: "Clay", size: "Queen" }, inventory: 24, tint: "#DCCFB4" },
      { id: "v7", title: "Sage / Queen", price: 249, optionValues: { colour: "Sage", size: "Queen" }, inventory: 17, tint: "#A8B79A" },
      { id: "v8", title: "Clay / King", price: 279, optionValues: { colour: "Clay", size: "King" }, inventory: 12, tint: "#DCCFB4" },
    ],
    rating: 4.7,
    reviewCount: 601,
    hotspots: [
      { id: "h6", x: 50, y: 30, label: "Weave", description: "300-thread-count organic cotton sateen." },
      { id: "h7", x: 50, y: 70, label: "Finish", description: "Stonewashed for a soft hand-feel from night one." },
    ],
    materialDetail: {
      name: "GOTS-certified organic cotton sateen",
      texture: "Smooth, lightly lustrous weave with a soft drape.",
      craft: "Woven from certified organic cotton, then stonewashed to break in the fibres before it ships.",
      care: "Machine wash cold, tumble dry low; avoid bleach and fabric softener.",
    },
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
      { id: "v9", title: "Brushed Brass", price: 380, optionValues: { finish: "Brushed Brass" }, inventory: 15, tint: "#C8A876" },
      { id: "v10", title: "Blackened Brass", price: 410, optionValues: { finish: "Blackened Brass" }, inventory: 8, tint: "#2E2A24" },
    ],
    rating: 4.6,
    reviewCount: 132,
    hotspots: [
      { id: "h8", x: 50, y: 25, label: "Rod", description: "Solid brass, hand-finished." },
      { id: "h9", x: 50, y: 68, label: "Globe", description: "Opal glass, diffuses light evenly." },
    ],
    materialDetail: {
      name: "Solid brushed brass",
      texture: "Warm, low-sheen metal with a fine directional grain.",
      craft: "Cast and hand-brushed, then lacquered to slow natural tarnish.",
      care: "Dust with a dry cloth; avoid abrasive cleaners on the lacquer.",
    },
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
    isNew: true,
    swatch: "linear-gradient(135deg, #EFE9DD, #D2C6AE)",
    variants: [
      { id: "v11", title: "Ivory", price: 890, optionValues: { colour: "Ivory" }, inventory: 11, tint: "#EFE9DD" },
      { id: "v12", title: "Stone", price: 890, optionValues: { colour: "Stone" }, inventory: 6, tint: "#B7AC98" },
    ],
    rating: 4.9,
    reviewCount: 97,
    hotspots: [
      { id: "h10", x: 45, y: 38, label: "Upholstery", description: "Dense ivory bouclé, textured and durable." },
      { id: "h11", x: 50, y: 85, label: "Legs", description: "Turned beechwood, sealed with a matte oil." },
    ],
    materialDetail: {
      name: "Ivory bouclé",
      texture: "Looped, nubby pile with visible dimension.",
      craft: "Woven from tightly twisted looped yarn for a resilient, hard-wearing surface.",
      care: "Vacuum with an upholstery brush; blot spills immediately, do not rub.",
    },
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
    hotspots: [
      { id: "h12", x: 50, y: 50, label: "Glaze", description: "Reactive charcoal glaze, unique per piece." },
    ],
    materialDetail: {
      name: "Reactive-glaze stoneware",
      texture: "Semi-matte surface with pooled, mottled variation.",
      craft: "Fired stoneware finished in a reactive glaze that shifts tone with kiln placement.",
      care: "Dishwasher and microwave safe; avoid extreme temperature shocks.",
    },
  },
];

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
};

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
