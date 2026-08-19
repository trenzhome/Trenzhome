"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ScratchCard } from "./scratch-card";

export function ScratchDiscountModal({
  open,
  revealed,
  code,
  percentage,
  onReveal,
  onSkip,
  onContinue,
}: {
  open: boolean;
  revealed: boolean;
  code: string;
  percentage: number;
  onReveal: () => void;
  onSkip: () => void;
  onContinue: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 backdrop-blur-sm px-6"
          onClick={onSkip}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-paper p-7 text-center shadow-luxury"
          >
            <button
              type="button"
              aria-label="Skip and continue to checkout"
              onClick={onSkip}
              className="absolute right-4 top-4 text-steel hover:text-ink transition-colors"
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            <p className="eyebrow mb-2">Before You Checkout</p>
            <h2 className="font-display text-xl mb-1">Scratch for a surprise discount</h2>
            <p className="text-steel text-sm mb-5">
              Drag across the card below to reveal your code.
            </p>

            <ScratchCard code={code} percentage={percentage} onReveal={onReveal} />

            <div className="mt-5">
              {revealed ? (
                <button onClick={onContinue} className="btn-flare w-full">
                  Continue to Checkout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSkip}
                  className="text-xs text-steel hover:text-flare transition-colors"
                >
                  Skip and continue to checkout
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
