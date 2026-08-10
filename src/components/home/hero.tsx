"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MaterialSwatch } from "@/components/product/material-swatch";

const DEFAULT_SWATCH = "linear-gradient(135deg, #D9CBB5, #B8A582)";

export interface HeroProduct {
  slug: string;
  title: string;
  price: number;
  image?: string;
}

export function Hero({
  swatch = DEFAULT_SWATCH,
  featured = [],
}: {
  swatch?: string;
  featured?: HeroProduct[];
}) {
  const [main, side1, side2] = featured;
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative -mt-[116px] md:-mt-[164px] min-h-[92vh] pt-[116px] md:pt-[164px] bg-ink text-paper overflow-hidden flex items-center">
      {/* Dark ambient backdrop behind the copy; the right-hand panel shows the
          real featured product photo (falls back to a swatch gradient if no
          product has one yet). */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      >
        <MaterialSwatch
          gradient="linear-gradient(135deg, #2B2823 0%, #161512 55%, #0D0C0A 100%)"
          className="absolute -inset-10 h-[calc(100%+80px)] w-[calc(100%+80px)]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 hidden md:block">
        <div className="relative w-[220px] lg:w-[280px]">
          {main?.image ? (
            <Link
              href={`/product/${main.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-luxury ring-1 ring-paper/10 -rotate-3 transition-transform duration-500 hover:rotate-0"
            >
              <Image
                src={main.image}
                alt={main.title}
                fill
                sizes="280px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xs font-medium text-paper truncate">{main.title}</p>
                <p className="text-xs font-mono text-paper/70">${main.price.toLocaleString()}</p>
              </div>
            </Link>
          ) : (
            <MaterialSwatch
              gradient={swatch}
              className="aspect-[4/5] rounded-2xl shadow-luxury ring-1 ring-paper/10 -rotate-3"
            />
          )}

          {side1?.image && (
            <Link
              href={`/product/${side1.slug}`}
              aria-label={side1.title}
              className="group absolute -left-14 bottom-4 h-24 w-24 overflow-hidden rounded-xl shadow-luxury ring-2 ring-ink rotate-6 transition-transform duration-300 hover:rotate-0 hover:scale-105"
            >
              <Image src={side1.image} alt={side1.title} fill sizes="96px" className="object-cover" />
            </Link>
          )}

          {side2?.image && (
            <Link
              href={`/product/${side2.slug}`}
              aria-label={side2.title}
              className="group absolute -right-10 -top-8 h-20 w-20 overflow-hidden rounded-xl shadow-luxury ring-2 ring-ink -rotate-6 transition-transform duration-300 hover:rotate-0 hover:scale-105"
            >
              <Image src={side2.image} alt={side2.title} fill sizes="80px" className="object-cover" />
            </Link>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="eyebrow text-paper/60 mb-6"
        >
          The Autumn Edit
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display italic text-5xl sm:text-6xl md:text-8xl leading-[1.02] mb-8 max-w-3xl"
        >
          Furniture, considered.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
          className="text-paper/70 text-lg max-w-md mb-10 leading-relaxed"
        >
          One honest material per piece — a slab of travertine, a bolt of
          Belgian linen — made to outlast the trend cycle, not chase it.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <Link href="/shop" className="btn-flare">
            Shop the Edit
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-paper/50"
      >
        <ChevronDown size={22} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
