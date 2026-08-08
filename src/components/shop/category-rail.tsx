import Link from "next/link";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { products } from "@/lib/products";

export function CategoryRail({
  categories,
  activeCategory,
}: {
  categories: string[];
  activeCategory?: string;
}) {
  const items = [
    { label: "All Products", value: undefined, swatch: undefined },
    ...categories.map((category) => ({
      label: category,
      value: category.toLowerCase(),
      swatch: products.find((p) => p.category === category)?.swatch,
    })),
  ];

  return (
    <div className="flex gap-7 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-none">
      {items.map((item) => {
        const isActive = activeCategory?.toLowerCase() === item.value;
        return (
          <Link
            key={item.label}
            href={item.value ? `/shop?category=${item.value}` : "/shop"}
            className="group flex flex-col items-center gap-2.5 shrink-0"
          >
            <span
              className={`relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden shadow-soft ring-2 transition-colors ${
                isActive ? "ring-flare" : "ring-transparent group-hover:ring-ink/15"
              }`}
            >
              {item.swatch ? (
                <MaterialSwatch
                  gradient={item.swatch}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-fog text-ink font-display text-lg">
                  All
                </span>
              )}
            </span>
            <span
              className={`text-xs font-medium whitespace-nowrap ${
                isActive ? "text-flare" : "text-ink/70 group-hover:text-ink"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
