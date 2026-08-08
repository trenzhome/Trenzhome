"use client";

import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, Columns3, GitCompare, X } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/product-card";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { ShopFilters } from "./shop-filters";

const COLUMN_OPTIONS = [2, 3, 4] as const;
const COLUMN_CLASSES: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};
const MAX_COMPARE = 3;

export function ShopBrowser({
  products,
  categories,
  activeCategory,
  priceBounds,
}: {
  products: Product[];
  categories: string[];
  activeCategory?: string;
  priceBounds: { min: number; max: number };
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [columns, setColumns] = useState<number>(3);
  const [compareMode, setCompareMode] = useState(false);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [comparePanelOpen, setComparePanelOpen] = useState(false);

  function toggleCompare(slug: string) {
    setCompareSlugs((cur) => {
      if (cur.includes(slug)) return cur.filter((s) => s !== slug);
      if (cur.length >= MAX_COMPARE) return cur;
      return [...cur, slug];
    });
  }

  function exitCompareMode() {
    setCompareMode(false);
    setCompareSlugs([]);
    setComparePanelOpen(false);
  }

  const compareProducts = products.filter((p) => compareSlugs.includes(p.slug));

  return (
    <div className="flex flex-col md:flex-row gap-12">
      <div className={`${filtersOpen ? "block" : "hidden"} md:block shrink-0`}>
        <ShopFilters
          categories={categories}
          activeCategory={activeCategory}
          priceBounds={priceBounds}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-ink/10">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="md:hidden flex items-center gap-2 text-sm font-medium hover:text-flare transition-colors"
            >
              <SlidersHorizontal size={15} strokeWidth={1.75} />
              Show Filters
            </button>
            <p className="text-sm text-steel">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => {
                if (compareMode) {
                  exitCompareMode();
                } else {
                  setCompareMode(true);
                }
              }}
              aria-pressed={compareMode}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                compareMode ? "text-flare" : "hover:text-flare"
              }`}
            >
              <GitCompare size={15} strokeWidth={1.75} />
              {compareMode ? "Exit Compare" : "Compare Products"}
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-steel">
              <Columns3 size={14} strokeWidth={1.75} className="mr-1" />
              {COLUMN_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`Show ${n} columns`}
                  aria-pressed={columns === n}
                  onClick={() => setColumns(n)}
                  className={`h-6 w-6 rounded text-xs font-mono transition-colors ${
                    columns === n ? "bg-ink text-paper" : "hover:text-flare"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-steel">No products match these filters yet.</p>
        ) : (
          <div
            className={`grid grid-cols-2 gap-x-6 gap-y-12 ${COLUMN_CLASSES[columns]}`}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                compareMode={compareMode}
                compareSelected={compareSlugs.includes(product.slug)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        )}
      </div>

      {compareMode && compareSlugs.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-6 pb-6">
          <div className="glass-panel rounded-2xl px-5 py-3.5 flex items-center gap-4 shadow-luxury">
            <div className="flex -space-x-2">
              {compareProducts.map((p) => (
                <MaterialSwatch
                  key={p.slug}
                  gradient={p.swatch}
                  className="h-9 w-9 rounded-full ring-2 ring-paper"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-ink">
              {compareSlugs.length} of {MAX_COMPARE} selected
            </p>
            <button
              type="button"
              onClick={() => setComparePanelOpen(true)}
              className="btn-flare !px-5 !py-2.5 text-xs"
            >
              Compare
            </button>
            <button
              type="button"
              aria-label="Clear compare selection"
              onClick={exitCompareMode}
              className="text-steel hover:text-flare transition-colors"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {comparePanelOpen && (
        <div
          className="fixed inset-0 z-50 glass-dark flex items-center justify-center p-6"
          onClick={() => setComparePanelOpen(false)}
        >
          <div
            className="w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl bg-paper p-8 shadow-luxury"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl">Compare</h2>
              <button
                type="button"
                aria-label="Close compare panel"
                onClick={() => setComparePanelOpen(false)}
                className="text-steel hover:text-flare transition-colors"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: `repeat(${compareProducts.length}, minmax(0, 1fr))` }}
            >
              {compareProducts.map((p) => (
                <div key={p.slug}>
                  <MaterialSwatch
                    gradient={p.swatch}
                    className="aspect-square rounded-xl mb-4 shadow-soft"
                  />
                  <p className="font-display text-lg mb-3">{p.title}</p>
                  <dl className="space-y-2.5 text-sm">
                    <div className="flex justify-between gap-2 border-t border-ink/10 pt-2.5">
                      <dt className="text-steel">Price</dt>
                      <dd className="font-mono font-bold text-right">
                        ${p.basePrice.toLocaleString()}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2 border-t border-ink/10 pt-2.5">
                      <dt className="text-steel">Material</dt>
                      <dd className="text-right">{p.material}</dd>
                    </div>
                    <div className="flex justify-between gap-2 border-t border-ink/10 pt-2.5">
                      <dt className="text-steel">Rating</dt>
                      <dd className="font-mono text-right">
                        {p.rating} ({p.reviewCount})
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={`/product/${p.slug}`}
                    className="btn-outline w-full mt-5 !py-2.5 text-xs"
                  >
                    View Product
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
