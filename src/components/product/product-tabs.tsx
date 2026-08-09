"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Star, BadgeCheck } from "lucide-react";
import { Product } from "@/types";

function SampleReviews({
  product,
  rating,
  reviewCount,
}: {
  product: Product;
  rating: number;
  reviewCount: number;
}) {
  const reviews = [
    {
      name: "S. Whitfield",
      rating: Math.min(5, Math.round(rating)),
      body: `Exactly as described — the ${product.material.split(",")[0].toLowerCase()} is even better in person than in the photos.`,
    },
    {
      name: "D. Njoroge",
      rating: Math.max(3, Math.round(rating) - 1),
      body: "Shipping took a bit longer than the estimate, but the piece itself is excellent quality.",
    },
    {
      name: "L. Marchetti",
      rating: Math.min(5, Math.round(rating)),
      body: "Ordered a second one for the guest room. Consistent quality between both.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex text-flare">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} fill={i < Math.round(rating) ? "currentColor" : "none"} strokeWidth={1.5} />
          ))}
        </div>
        <span className="text-sm text-steel">
          {rating} out of 5 &middot; {reviewCount} reviews
        </span>
      </div>
      <div className="space-y-5">
        {reviews.map((review) => (
          <div key={review.name} className="border-b border-ink/10 pb-5 last:border-0">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex text-flare">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                ))}
              </div>
              <span className="text-sm font-medium">{review.name}</span>
              <BadgeCheck size={13} className="text-flare" strokeWidth={2} />
            </div>
            <p className="text-sm text-ink/80 leading-relaxed">{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Faqs() {
  const faqs = [
    { q: "Can I return this if it doesn't fit my space?", a: "Yes — returns are accepted within 30 days in original condition. See our Returns policy for details." },
    { q: "Is assembly required?", a: "Most pieces arrive partially assembled with tool-free final assembly. Full instructions are included." },
    { q: "Do you offer white-glove delivery?", a: "White-glove delivery (in-room placement and packaging removal) is available at checkout for large furniture items." },
  ];
  return (
    <dl className="space-y-5">
      {faqs.map((f) => (
        <div key={f.q}>
          <dt className="font-medium mb-1">{f.q}</dt>
          <dd className="text-sm text-ink/70 leading-relaxed">{f.a}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProductTabs({ product }: { product: Product }) {
  const sections = [
    { id: "description", label: "Description", content: <p className="text-ink/80 leading-relaxed">{product.description}</p> },
    {
      id: "specifications",
      label: "Specifications",
      content: (
        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <dt className="text-steel">Material</dt>
          <dd>{product.material}</dd>
          <dt className="text-steel">Category</dt>
          <dd>{product.category}</dd>
          {product.materialDetail && (
            <>
              <dt className="text-steel">Texture</dt>
              <dd>{product.materialDetail.texture}</dd>
            </>
          )}
        </dl>
      ),
    },
    ...(product.materialDetail
      ? [{
          id: "care",
          label: "Care Guide",
          content: <p className="text-ink/80 leading-relaxed">{product.materialDetail.care}</p>,
        }]
      : []),
    {
      id: "shipping",
      label: "Shipping & Returns",
      content: (
        <div className="space-y-3 text-sm text-ink/80 leading-relaxed">
          <p>Free shipping on orders over $150. Standard delivery arrives in 5–9 business days; white-glove delivery available at checkout for furniture.</p>
          <p>Returns accepted within 30 days of delivery in original condition. Custom and made-to-order pieces are final sale.</p>
        </div>
      ),
    },
    ...(product.rating != null && product.reviewCount != null
      ? [{
          id: "reviews",
          label: `Reviews (${product.reviewCount})`,
          content: <SampleReviews product={product} rating={product.rating} reviewCount={product.reviewCount} />,
        }]
      : []),
    { id: "faqs", label: "FAQs", content: <Faqs /> },
  ];

  const [open, setOpen] = useState<string>(sections[0].id);

  return (
    <div className="mt-20 max-w-3xl">
      {sections.map((section) => {
        const isOpen = open === section.id;
        return (
          <div key={section.id} className="border-b border-ink/10">
            <button
              onClick={() => setOpen(isOpen ? "" : section.id)}
              className="w-full flex items-center justify-between py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg">{section.label}</span>
              <ChevronDown
                size={18}
                strokeWidth={1.75}
                className={`text-steel transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                  <div className="pb-6">{section.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
