"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { products } from "@/lib/products";
import { MaterialSwatch } from "@/components/product/material-swatch";

export function Hero() {
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
    <section className="relative -mt-[116px] min-h-[92vh] pt-[116px] bg-ink text-paper overflow-hidden flex items-center">
      {/* Cinematic background — material-swatch gradients stand in for lifestyle photography/video
          until real 4K assets are available; this section is built to accept a <video> or
          Next.js <Image> background directly in its place. */}
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
      <div className="absolute right-[-8%] top-1/2 -translate-y-1/2 w-[55%] aspect-[3/4] hidden md:block opacity-90">
        <MaterialSwatch
          gradient={products[0].swatch}
          className="h-full w-full rounded-3xl shadow-luxury ring-1 ring-paper/10 -rotate-3"
        />
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
