"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MaterialDetail } from "@/types";
import { MaterialSwatch } from "./material-swatch";

/**
 * Close-up "material" view: a CSS-scaled version of the same gradient swatch
 * used elsewhere, not a real macro photograph.
 */
export function MaterialExplorer({
  gradient,
  detail,
  onClose,
}: {
  gradient: string;
  detail: MaterialDetail;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-ink/80 flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-paper max-w-2xl w-full grid md:grid-cols-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
        >
          <MaterialSwatch gradient={gradient} className="aspect-square md:aspect-auto md:h-full scale-100" />
          <div className="p-8 relative">
            <button
              onClick={onClose}
              aria-label="Close material detail"
              className="absolute right-4 top-4 text-steel hover:text-flare transition-colors"
            >
              <X size={20} />
            </button>
            <p className="eyebrow mb-2">Material</p>
            <h3 className="font-display text-2xl mb-4">{detail.name}</h3>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-bold uppercase tracking-wide text-xs text-steel mb-1">Texture</dt>
                <dd className="text-ink/80">{detail.texture}</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-wide text-xs text-steel mb-1">Craft</dt>
                <dd className="text-ink/80">{detail.craft}</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-wide text-xs text-steel mb-1">Care</dt>
                <dd className="text-ink/80">{detail.care}</dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
