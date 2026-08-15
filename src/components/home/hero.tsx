"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MaterialSwatch } from "@/components/product/material-swatch";

const DEFAULT_SWATCH = "linear-gradient(135deg, #D9CBB5, #B8A582)";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export interface HeroProduct {
  slug: string;
  title: string;
  price: number;
  image?: string;
}

export function FloatingCard({
  product,
  className,
  imgSize,
  rotate,
  delay = 0,
  priority = false,
}: {
  product?: HeroProduct;
  className: string;
  imgSize: string;
  rotate: number;
  delay?: number;
  priority?: boolean;
}) {
  if (!product?.image) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotate * 1.6 }}
      animate={{ opacity: 1, y: [0, -10, 0], rotate }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 0.8, delay },
      }}
      className={className}
    >
      <Link
        href={`/product/${product.slug}`}
        className="group relative block h-full w-full overflow-hidden rounded-2xl shadow-luxury ring-1 ring-paper/10 transition-transform duration-500 hover:!rotate-0"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes={imgSize}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-xs font-medium text-paper truncate">{product.title}</p>
          <p className="text-xs font-mono text-paper/70">${product.price.toLocaleString()}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export function Hero({
  swatch = DEFAULT_SWATCH,
  featured = [],
}: {
  swatch?: string;
  featured?: HeroProduct[];
}) {
  const [main, side1, side2, side3] = featured;
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
    <section className="relative -mt-[116px] md:-mt-[164px] min-h-[36vh] md:min-h-[40vh] pt-[116px] md:pt-[164px] bg-ink text-paper overflow-hidden flex items-center">
      {/* Dark ambient backdrop */}
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

      {/* Ambient light orbs so the negative space around the copy never reads flat/empty */}
      <motion.div
        aria-hidden
        className="absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full bg-flare/25 blur-[110px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-1/3 top-0 h-[320px] w-[320px] rounded-full bg-sand-dark/20 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      {/* Desktop collage — spans the full hero height so there's no dead space */}
      <motion.div
        className="absolute inset-y-0 right-0 hidden md:block w-[30%] lg:w-[26%]"
        animate={{ x: offset.x * 0.6, y: offset.y * 0.6 }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      >
        <FloatingCard
          product={main}
          rotate={-3}
          delay={0.1}
          priority
          imgSize="(min-width: 1024px) 320px, 260px"
          className="absolute right-[10%] top-[16%] h-[38%] w-[62%] lg:w-[58%]"
        />
        <FloatingCard
          product={side1}
          rotate={6}
          delay={0.6}
          imgSize="180px"
          className="absolute left-[2%] top-[6%] h-[24%] w-[34%]"
        />
        <FloatingCard
          product={side2}
          rotate={-6}
          delay={1.1}
          imgSize="200px"
          className="absolute right-[4%] bottom-[8%] h-[28%] w-[38%]"
        />
        <FloatingCard
          product={side3}
          rotate={5}
          delay={0.35}
          imgSize="170px"
          className="absolute left-[6%] bottom-[20%] h-[22%] w-[32%]"
        />
        {!main?.image && (
          <MaterialSwatch
            gradient={swatch}
            className="absolute right-[10%] top-[20%] h-[45%] w-[60%] rounded-2xl shadow-luxury ring-1 ring-paper/10 -rotate-3"
          />
        )}
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1800px] px-6 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="eyebrow text-paper/60 mb-2"
        >
          The Autumn Edit
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display italic text-xl sm:text-[1.1875rem] md:text-[1.375rem] leading-[1.05] mb-3 max-w-md"
        >
          Furniture, considered.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
          className="text-paper/70 text-xs max-w-xs mb-4 leading-relaxed"
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

        {/* Mobile collage — the desktop panel is hidden below md, so give phones
            a shoppable image strip too instead of a flat wall of text. */}
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2 md:hidden -mx-6 px-6 snap-x snap-mandatory">
          {[main, side1, side2, side3]
            .filter((p): p is HeroProduct => Boolean(p?.image))
            .map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="relative h-24 w-20 flex-none snap-start"
              >
                <Link
                  href={`/product/${p.slug}`}
                  className="group relative block h-full w-full overflow-hidden rounded-xl shadow-luxury ring-1 ring-paper/10"
                >
                  <Image src={p.image!} alt={p.title} fill sizes="128px" className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-2">
                    <p className="text-[11px] font-medium text-paper truncate">{p.title}</p>
                    <p className="text-[11px] font-mono text-paper/70">${p.price.toLocaleString()}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-paper/50 hidden md:block"
      >
        <ChevronDown size={22} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
