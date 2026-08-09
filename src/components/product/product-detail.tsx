"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Minus, Plus, Truck } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/components/cart/cart-context";
import { ShowroomViewer } from "./showroom-viewer";
import { Configurator } from "./configurator";
import { MaterialExplorer } from "./material-explorer";
import { ProductActions } from "./product-actions";
import { StickyAddToCart } from "./sticky-add-to-cart";
import { estimateDeliveryRange } from "@/lib/delivery";
import { recordRecentlyViewed } from "@/lib/recently-viewed";

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [materialOpen, setMaterialOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const variant = product.variants.find((v) => v.id === variantId)!;
  const { addLine } = useCart();
  const addToCartRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    recordRecentlyViewed(product.slug);
  }, [product.slug]);

  useEffect(() => {
    const el = addToCartRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { rootMargin: "-120px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function buildLine(qty: number) {
    return {
      variantId: variant.id,
      productSlug: product.slug,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      quantity: qty,
      swatch: product.swatch,
    };
  }

  async function handleBuyNow() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines: [buildLine(quantity)] }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="grid md:grid-cols-2 gap-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ShowroomViewer
          gradient={product.swatch}
          tint={variant.tint}
          hotspots={product.hotspots}
          onExploreMaterial={product.materialDetail ? () => setMaterialOpen(true) : undefined}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      >
        <p className="eyebrow mb-3">{product.category}</p>
        <h1 className="font-display text-5xl mb-3">{product.title}</h1>

        <div className="flex items-center justify-between mb-6">
          {product.rating != null && product.reviewCount != null ? (
            <div className="flex items-center gap-2">
              <div className="flex text-flare">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={i < Math.round(product.rating!) ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="text-sm text-steel">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          ) : (
            <div />
          )}
          <ProductActions slug={product.slug} title={product.title} />
        </div>

        <p className="font-mono text-2xl font-bold mb-1">
          ${variant.price.toLocaleString()}
        </p>
        <p className="text-sm text-steel mb-8">{product.material}</p>

        <p className="text-ink/80 mb-8 max-w-md">{product.description}</p>

        <Configurator
          variants={product.variants}
          activeVariantId={variantId}
          onSelect={setVariantId}
        />

        <p className="text-sm mb-6 font-medium">
          {variant.inventory > 0
            ? variant.inventory <= 5
              ? <span className="text-flare">Only {variant.inventory} left in stock</span>
              : <span className="text-steel">In stock</span>
            : <span className="text-steel">Out of stock</span>}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center rounded-full border border-ink/15">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="p-3 pl-4"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-mono font-bold">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="p-3 pr-4"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            ref={addToCartRef}
            disabled={variant.inventory === 0}
            onClick={() => addLine(buildLine(quantity))}
            className="btn-flare flex-1 disabled:opacity-40 disabled:pointer-events-none"
          >
            Add to Bag
          </button>
        </div>

        <button
          disabled={variant.inventory === 0}
          onClick={handleBuyNow}
          className="btn-outline w-full mb-6 disabled:opacity-40 disabled:pointer-events-none"
        >
          Buy Now
        </button>

        <div className="flex items-center gap-2 text-sm text-steel">
          <Truck size={16} strokeWidth={1.75} />
          <span>Estimated delivery {estimateDeliveryRange()}</span>
        </div>
      </motion.div>

      {materialOpen && product.materialDetail && (
        <MaterialExplorer
          gradient={product.swatch}
          detail={product.materialDetail}
          onClose={() => setMaterialOpen(false)}
        />
      )}

      <StickyAddToCart
        visible={stickyVisible && variant.inventory > 0}
        title={product.title}
        swatch={product.swatch}
        variantTitle={variant.title}
        price={variant.price}
        disabled={variant.inventory === 0}
        onAdd={() => addLine(buildLine(quantity))}
      />
    </div>
  );
}
