import Link from "next/link";

export function CategoryRail({
  categories,
  activeCategory,
}: {
  categories: string[];
  activeCategory?: string;
}) {
  const items = [
    { label: "All Products", value: undefined },
    ...categories.map((category) => ({ label: category, value: category.toLowerCase() })),
  ];

  return (
    <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-none">
      {items.map((item) => {
        const isActive = activeCategory?.toLowerCase() === item.value;
        return (
          <Link
            key={item.label}
            href={item.value ? `/shop?category=${item.value}` : "/shop"}
            className={`shrink-0 whitespace-nowrap px-6 py-3.5 text-xs font-bold uppercase tracking-wide transition-colors ${
              isActive
                ? "bg-flare text-paper"
                : "bg-ink text-paper hover:bg-charcoal"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
