"use client";

import { ProductVariant } from "@/types";

export function Configurator({
  variants,
  activeVariantId,
  onSelect,
}: {
  variants: ProductVariant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}) {
  if (variants.length <= 1) return null;

  return (
    <div className="mb-8">
      <p className="eyebrow mb-3">Options</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => onSelect(v.id)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
              v.id === activeVariantId
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 hover:border-ink"
            }`}
          >
            {v.tint && (
              <span
                aria-hidden
                className="h-3 w-3 rounded-full ring-1 ring-inset ring-black/20"
                style={{ background: v.tint }}
              />
            )}
            {v.title}
          </button>
        ))}
      </div>
    </div>
  );
}
