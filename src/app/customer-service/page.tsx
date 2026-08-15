"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Truck, RotateCcw, ShieldCheck, Search } from "lucide-react";

const NAV = [
  { id: "shipping", label: "Shipping" },
  { id: "returns", label: "Returns" },
  { id: "warranty", label: "Warranty" },
  { id: "track-order", label: "Track Order" },
  { id: "faq", label: "FAQ" },
];

const FAQS = [
  { q: "How long does shipping take?", a: "Standard delivery arrives in 5–9 business days. Orders over $150 ship free; white-glove delivery is available at checkout for large furniture." },
  { q: "What's your return policy?", a: "30 days from delivery, in original condition. Custom and made-to-order pieces are final sale — this is noted on the product page before you order." },
  { q: "Do you ship internationally?", a: "Currently we ship within Australia only. International shipping is on our roadmap." },
  { q: "Can I change or cancel an order after placing it?", a: "Orders can be changed or cancelled within 2 hours of placing them — contact us as soon as possible via the form on our Contact page." },
  { q: "Is assembly required?", a: "Most pieces arrive partially assembled with tool-free final assembly. Full instructions are included in the box." },
];

function TrackOrderForm() {
  const [status, setStatus] = useState<"idle" | "searched">("idle");

  return (
    <div className="max-w-md">
      {status === "searched" ? (
        <div className="rounded-2xl bg-fog p-8">
          <p className="font-medium mb-2">Order lookup is coming soon</p>
          <p className="text-sm text-steel leading-relaxed">
            We couldn&rsquo;t look that up automatically yet. In the meantime, check the
            confirmation email from your order for tracking details, or{" "}
            <Link href="/contact" className="underline hover:text-flare">contact us</Link> with your order number.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("searched");
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs uppercase tracking-wide text-steel mb-2 block">Order Number</label>
            <input required type="text" placeholder="#1042" className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-flare" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-steel mb-2 block">Email</label>
            <input required type="email" className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-flare" />
          </div>
          <button type="submit" className="btn-flare inline-flex items-center gap-2">
            <Search size={15} strokeWidth={2} /> Track Order
          </button>
        </form>
      )}
    </div>
  );
}

export default function CustomerServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-[1800px] px-6 py-5">
      <p className="eyebrow mb-3">Help Center</p>
      <h1 className="font-display text-xl mb-6">Customer Service</h1>

      <nav className="flex flex-wrap gap-3 mb-16">
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium hover:border-flare hover:text-flare transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <section id="shipping" className="scroll-mt-32 py-5 border-t border-ink/10">
        <div className="flex items-start gap-4 mb-4">
          <Truck size={20} strokeWidth={1.75} className="text-flare mt-1" />
          <h2 className="font-display text-xl">Shipping</h2>
        </div>
        <div className="max-w-2xl text-ink/80 leading-relaxed space-y-3 pl-9">
          <p>Free standard shipping on orders over $150. Standard delivery arrives in 5–9 business days from dispatch.</p>
          <p>White-glove delivery — in-room placement and packaging removal — is available at checkout for large furniture items.</p>
          <p>We currently ship within Australia only.</p>
        </div>
      </section>

      <section id="returns" className="scroll-mt-32 py-5 border-t border-ink/10">
        <div className="flex items-start gap-4 mb-4">
          <RotateCcw size={20} strokeWidth={1.75} className="text-flare mt-1" />
          <h2 className="font-display text-xl">Returns &amp; Refunds</h2>
        </div>
        <div className="max-w-2xl text-ink/80 leading-relaxed space-y-3 pl-9">
          <p>Returns are accepted within 30 days of delivery in original, unused condition. Custom and made-to-order pieces are final sale.</p>
          <p>Once we receive and inspect your return, refunds are issued to your original payment method within 5–7 business days.</p>
          <p>To start a return, <Link href="/contact" className="underline hover:text-flare">contact us</Link> with your order number.</p>
        </div>
      </section>

      <section id="warranty" className="scroll-mt-32 py-5 border-t border-ink/10">
        <div className="flex items-start gap-4 mb-4">
          <ShieldCheck size={20} strokeWidth={1.75} className="text-flare mt-1" />
          <h2 className="font-display text-xl">Warranty</h2>
        </div>
        <div className="max-w-2xl text-ink/80 leading-relaxed space-y-3 pl-9">
          <p>All furniture is covered by a 2-year structural warranty against manufacturing defects in frames, hardware, and mechanisms.</p>
          <p>Textile wear from normal use, and damage from misuse or improper care, aren&rsquo;t covered — see each product&rsquo;s Care Guide for maintenance that keeps your warranty valid.</p>
        </div>
      </section>

      <section id="track-order" className="scroll-mt-32 py-5 border-t border-ink/10">
        <h2 className="font-display text-xl mb-6">Track Your Order</h2>
        <TrackOrderForm />
      </section>

      <section id="faq" className="scroll-mt-32 py-5 border-t border-ink/10">
        <h2 className="font-display text-xl mb-6">Frequently Asked Questions</h2>
        <div className="max-w-2xl">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={faq.q} className="border-b border-ink/10">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown size={18} strokeWidth={1.75} className={`text-steel shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
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
      </section>
    </div>
  );
}
