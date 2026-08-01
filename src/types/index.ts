export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  optionValues: Record<string, string>;
  inventory: number;
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
