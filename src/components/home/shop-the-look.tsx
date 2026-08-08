"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";
import { MaterialSwatch } from "@/components/product/material-swatch";
import { Reveal } from "./reveal";

// Editorial "shop the look" scene, built the same way as the rest of the
// site: no photography exists yet, so each piece of furniture is a
// MaterialSwatch shape (its real product gradient) arranged into a room
// silhouette. Every shape is a tagged hotspot linking straight to checkout,
// same idea as Deck-style visual-storytelling themes ("Shop the Look").
const SCENE = [
  { slug: "harlow-linen-sofa", x: 32, y: 66, shape: "sofa" as const },
  { slug: "isla-boucle-armchair", x: 79, y: 58, shape: "chair" as const },
  { slug: "moraine-brass-pendant", x: 52, y: 16, shape: "pendant" as const },
];

export function ShopTheLook() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow mb-3">Shop the Look</p>
            <h2 className="font-display text-3xl md:text-4xl max-w-lg">
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
