"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { Reveal } from "./reveal";

// Editorial "shop the look" scene: each piece of furniture is a
// MaterialSwatch shape (its real product gradient) arranged into a room
// silhouette. Every shape is a tagged hotspot linking straight to checkout,
// same idea as Deck-style visual-storytelling themes ("Shop the Look").
// Roles are resolved to real catalog products by category at render time
// (rather than hardcoded slugs) so this keeps working as the catalog changes.
const SCENE_ROLES = [
  { categories: ["Living"], x: 32, y: 66, shape: "sofa" as const },
  { categories: ["Dining", "Living"], x: 79, y: 58, shape: "chair" as const },
  { categories: ["Lighting"], x: 52, y: 16, shape: "pendant" as const },
];

export function ShopTheLook({ products }: { products: Product[] }) {
  const [active, setActive] = useState<string | null>(null);

  const used = new Set<string>();
  const SCENE = SCENE_ROLES.map((role) => {
    const product = products.find(
      (p) => role.categories.includes(p.category) && !used.has(p.id)
    );
    if (product) used.add(product.id);
    return { slug: product?.slug, x: role.x, y: role.y, shape: role.shape };
  }).filter((item): item is { slug: string; x: number; y: number; shape: typeof item.shape } =>
    Boolean(item.slug)
  );

  if (SCENE.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1800px] px-6 py-[1.5rem] md:py-[1.75rem]">
      <Reveal>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-2">Shop the Look</p>
            <h2 className="font-display text-[1.125rem] md:text-[1.375rem] max-w-lg">
              One room, tap any piece
            </h2>
          </div>
          <Link href="/rooms" className="btn-outline hidden sm:inline-flex">
            Browse Rooms
          </Link>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-3xl shadow-luxury"
          onClick={() => setActive(null)}
        >
          <MaterialSwatch
            gradient="linear-gradient(180deg, #F3EFE7 0%, #E9E1CE 62%, #E9E1CE 62%)"
            className="absolute inset-0 h-full w-full"
          />
          {/* floor plane */}
          <MaterialSwatch
            gradient="linear-gradient(180deg, #CBBB94 0%, #A9835A 100%)"
            className="absolute inset-x-0 bottom-0 h-[30%] opacity-40"
          />

          {SCENE.map((item) => {
            const product = products.find((p) => p.slug === item.slug);
            if (!product) return null;

            const shapeClass =
              item.shape === "sofa"
                ? "w-[42%] h-[26%] rounded-t-3xl rounded-b-lg"
                : item.shape === "chair"
                ? "w-[16%] h-[22%] rounded-t-[2.5rem] rounded-b-md"
                : "w-[7%] aspect-square rounded-full";

            return (
              <div key={item.slug} className="contents">
                {item.shape === "pendant" && (
                  <div
                    className="absolute w-px bg-ink/20"
                    style={{
                      left: `${item.x}%`,
                      top: 0,
                      height: `${item.y}%`,
                    }}
                  />
                )}
                <MaterialSwatch
                  gradient={product.swatch}
                  className={`absolute shadow-soft ${shapeClass}`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />

                <div
                  className="absolute z-10"
                  style={{ left: `${item.x}%`, top: `${item.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <button
                    type="button"
                    aria-label={`Shop ${product.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActive((cur) => (cur === item.slug ? null : item.slug));
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink shadow-lg ring-1 ring-ink/10 transition-transform hover:scale-110"
                  >
                    <Plus size={15} strokeWidth={2.5} />
                  </button>

                  {active === item.slug && (
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute w-56 flex items-center gap-3 bg-paper rounded-xl p-3 shadow-luxury ring-1 ring-ink/5 group ${
                        item.y > 45 ? "bottom-full mb-3" : "top-full mt-3"
                      } ${item.x > 65 ? "right-0" : item.x < 35 ? "left-0" : "left-1/2 -translate-x-1/2"}`}
                    >
                      <MaterialSwatch
                        gradient={product.swatch}
                        className="h-12 w-12 rounded-lg shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-ink truncate">{product.title}</p>
                        <p className="text-xs text-steel font-mono mt-0.5">
                          ${product.basePrice.toLocaleString()}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-steel shrink-0 transition-colors group-hover:text-flare"
                      />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
