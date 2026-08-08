"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function ShopFilters({
  categories,
  activeCategory,
  priceBounds,
}: {
  categories: string[];
  activeCategory?: string;
  priceBounds: { min: number; max: number };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("minPrice")) || priceBounds.min
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || priceBounds.max
  );

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // Commit price range to the URL only after the user stops dragging, so
  // every intermediate slider tick doesn't trigger a navigation.
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      minPrice > priceBounds.min ? params.set("minPrice", String(minPrice)) : params.delete("minPrice");
      maxPrice < priceBounds.max ? params.set("maxPrice", String(maxPrice)) : params.delete("maxPrice");
      const next = params.toString();
      if (next !== searchParams.toString()) {
        router.push(`${pathname}?${next}`, { scroll: false });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice]);

  return (
    <aside className="md:sticky md:top-[180px] md:self-start md:w-56 shrink-0 space-y-10">
      <div>
        <p className="eyebrow mb-4">Category</p>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => updateParam("category", null)}
              className={`text-sm ${!activeCategory ? "text-flare font-medium" : "text-ink/70 hover:text-flare"}`}
            >
              All Products
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => updateParam("category", cat.toLowerCase())}
                className={`text-sm ${
                  activeCategory?.toLowerCase() === cat.toLowerCase()
                    ? "text-flare font-medium"
                    : "text-ink/70 hover:text-flare"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="eyebrow mb-4">Price</p>
        <p className="text-sm font-mono mb-3">
          ${minPrice.toLocaleString()} &ndash; ${maxPrice.toLocaleString()}
        </p>
        <div className="relative h-5">
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={minPrice}
            onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full accent-flare pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
          />
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full accent-flare pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
          />
        </div>
      </div>
    </aside>
  );
}
