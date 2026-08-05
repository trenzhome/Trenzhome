"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MaterialSwatch } from "./material-swatch";

export function StickyAddToCart({
  visible,
  title,
  swatch,
  variantTitle,
  price,
  disabled,
  onAdd,
}: {
  visible: boolean;
  title: string;
  swatch: string;
  variantTitle: string;
  price: number;
  disabled: boolean;
  onAdd: () => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 inset-x-0 z-30 glass-panel border-t border-ink/10"
        >
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-4">
            <MaterialSwatch gradient={swatch} className="h-12 w-10 rounded-lg shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-display text-base truncate">{title}</p>
              <p className="text-xs text-steel">{variantTitle}</p>
            </div>
            <span className="font-mono text-sm font-bold hidden sm:inline">
              ${price.toLocaleString()}
            </span>
            <button onClick={onAdd} disabled={disabled} className="btn-flare disabled:opacity-40">
              Add to Bag
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
