"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Sofa,
  UtensilsCrossed,
  BedDouble,
  Lamp,
  ChefHat,
  SquareStack,
  Sparkle,
  Palette,
  Archive,
  Bath,
  CircleDot,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "all products": LayoutGrid,
  living: Sofa,
  dining: UtensilsCrossed,
  bedding: BedDouble,
  lighting: Lamp,
  "kitchen & dining": ChefHat,
  rugs: SquareStack,
  cushions: Sparkle,
  decor: Palette,
  storage: Archive,
  bath: Bath,
};

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

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <div className="pointer-events-none absolute -left-6 top-0 bottom-2 w-16 bg-gradient-to-r from-paper to-transparent z-10" />
      )}
      {canScrollRight && (
        <div className="pointer-events-none absolute -right-6 top-0 bottom-2 w-16 bg-gradient-to-l from-paper to-transparent z-10" />
      )}

      {canScrollLeft && (
        <button
          type="button"
          aria-label="Scroll categories left"
          onClick={() => scrollBy(-1)}
          className="absolute left-0 top-0 bottom-2 z-20 flex items-center pr-3 text-ink/60 hover:text-flare transition-colors"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper shadow-soft">
            <ChevronLeft size={16} strokeWidth={2} />
          </span>
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          aria-label="Scroll categories right"
          onClick={() => scrollBy(1)}
          className="absolute right-0 top-0 bottom-2 z-20 flex items-center pl-3 text-ink/60 hover:text-flare transition-colors"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper shadow-soft">
            <ChevronRight size={16} strokeWidth={2} />
          </span>
        </button>
      )}

      <div
        ref={scrollerRef}
        className="scrollbar-brand flex gap-2.5 overflow-x-auto pb-3 -mx-6 px-6"
      >
        {items.map((item) => {
          const isActive = activeCategory?.toLowerCase() === item.value;
          const Icon = ICONS[item.value ?? "all products"] ?? CircleDot;
          return (
            <Link
              key={item.label}
              href={item.value ? `/shop?category=${item.value}` : "/shop"}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap px-6 py-3.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                isActive ? "bg-flare text-paper" : "bg-ink text-paper hover:bg-charcoal"
              }`}
            >
              <Icon size={15} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
