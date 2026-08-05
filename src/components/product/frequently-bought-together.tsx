"use client";

import { Plus } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/components/cart/cart-context";
import { MaterialSwatch } from "./material-swatch";

export function FrequentlyBoughtTogether({
  product,
  companions,
}: {
  product: Product;
  companions: Product[];
}) {
  const { addLine } = useCart();
  if (companions.length === 0) return null;

  const bundle = [product, ...companions];
  const total = bundle.reduce((sum, p) => sum + p.basePrice, 0);

  function addBundle() {
    for (const p of bundle) {
      const variant = p.variants[0];
      addLine({
        variantId: variant.id,
        productSlug: p.slug,
        title: p.title,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        swatch: p.swatch,
      });
    }
  }

  return (
    <section className="mt-20">
      <p className="eyebrow mb-3">Frequently Bought Together</p>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {bundle.map((p, i) => (
          <div key={p.id} className="flex items-center gap-4">
            <div className="text-center">
              <MaterialSwatch gradient={p.swatch} className="h-20 w-20 rounded-xl shadow-soft" />
              <p className="text-xs text-steel mt-2 max-w-[80px] truncate">{p.title}</p>
            </div>
            {i < bundle.length - 1 && <Plus size={16} className="text-steel" />}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-lg font-bold">${total.toLocaleString()}</span>
        <button onClick={addBundle} className="btn-outline">
          Add All to Bag
        </button>
      </div>
    </section>
  );
}
