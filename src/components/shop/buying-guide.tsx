"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const GUIDE_STEPS = [
  {
    title: "Start with material, not color",
    body: "Color trends move; a material like solid oak, honed stone, or Belgian linen doesn't. Pick the material first and the palette tends to sort itself out.",
  },
  {
    title: "Measure the room, then the doorway",
    body: "Before ordering anything over 80cm, measure your narrowest doorway and stairwell turn, not just the room. Most returns we see are delivery-access issues, not the piece itself.",
  },
  {
    title: "Buy the size you'll actually use",
    body: "A 3-seat sofa in a small room gets pushed against a wall and avoided. Scale to how you'll sit in the space, not the room's square footage.",
  },
  {
    title: "Check the care requirements before, not after",
    body: "Bouclé and raw linen both mark easily. If you have pets or young kids, a performance weave or a darker tone will save you stress later.",
  },
];

export function BuyingGuide() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow mb-3">Before You Buy</p>
      <h2 className="font-display text-3xl md:text-4xl mb-10 max-w-lg">A Short Buying Guide</h2>
      <div className="max-w-2xl">
        {GUIDE_STEPS.map((step, i) => {
          const isOpen = open === i;
          return (
            <div key={step.title} className="border-b border-ink/10">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4"
                aria-expanded={isOpen}
              >
                <span className="font-display text-lg">{step.title}</span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.75}
                  className={`text-steel shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-ink/70 leading-relaxed">{step.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
