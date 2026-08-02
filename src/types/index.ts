export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  optionValues: Record<string, string>;
  inventory: number;
  tint?: string; // solid colour overlay applied to the showroom viewer when this variant is active
}

export interface Hotspot {
  id: string;
  x: number; // position on the viewer face, percent from left
  y: number; // position on the viewer face, percent from top
  label: string;
  description: string;
}

export interface MaterialDetail {
  name: string;
  texture: string;
  craft: string;
  care: string;
}

export interface CollectionStory {
  title: string;
  copy: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  material: string;
  basePrice: number;
  compareAtPrice?: number;
  swatch: string; // CSS gradient used for the material-swatch thumbnail
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  hotspots?: Hotspot[];
  materialDetail?: MaterialDetail;
}

export interface CartLine {
  variantId: string;
  productSlug: string;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
  swatch: string;
}
