"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "How long does shipping take?", a: "Standard delivery arrives in 5–9 business days. Orders over $150 ship free; white-glove delivery is available at checkout for large furniture." },
  { q: "What's your return policy?", a: "30 days from delivery, in original condition. Custom and made-to-order pieces are final sale — this is noted on the product page before you order." },
  { q: "Do you ship internationally?", a: "Currently we ship within Australia only. International shipping is on our roadmap." },
  { q: "Can I change or cancel an order after placing it?", a: "Orders can be changed or cancelled within 2 hours of placing them — contact us as soon as possible via Customer Service." },
];

export function ShopFaqs() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-fog py-20">
      <div className="mx-auto max-w-[1800px] px-6">
        <p className="eyebrow mb-3">Questions</p>
        <h2 className="font-display text-3xl md:text-4xl mb-10 max-w-lg">Frequently Asked</h2>
        <div className="max-w-2xl">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="border-b border-ink/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{faq.q}</span>
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
                      <p className="pb-6 text-sm text-ink/70 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
