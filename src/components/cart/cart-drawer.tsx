"use client";

import { X, Minus, Plus } from "lucide-react";
import { useCart } from "./cart-context";
import { MaterialSwatch } from "@/components/product/material-swatch";

export function CartDrawer() {
  const { isOpen, closeCart, lines, updateQuantity, removeLine, subtotal } =
    useCart();

  if (!isOpen) return null;

  async function handleCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-paper shadow-luxury flex flex-col rounded-l-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 h-20 bg-ink text-paper">
          <h2 className="font-display text-xl">Your Bag</h2>
          <button onClick={closeCart} aria-label="Close cart" className="hover:text-flare transition-colors">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {lines.length === 0 && (
            <p className="text-steel text-sm">
              Your bag is empty. Nothing chosen yet is not the same as nothing
              worth choosing.
            </p>
          )}
          {lines.map((line) => (
            <div key={line.variantId} className="flex gap-4">
              <MaterialSwatch
                gradient={line.swatch}
                className="h-20 w-16 shrink-0 rounded-xl shadow-soft"
              />
              <div className="flex-1">
                <p className="font-display text-base leading-snug">
                  {line.title}
                </p>
                <p className="text-sm text-steel">{line.variantTitle}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-ink/15">
                    <button
                      className="p-1.5 pl-3"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        updateQuantity(line.variantId, line.quantity - 1)
                      }
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-6 text-center text-sm font-mono font-bold">
                      {line.quantity}
                    </span>
                    <button
                      className="p-1.5 pr-3"
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity(line.variantId, line.quantity + 1)
                      }
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="font-mono text-sm font-bold">
                    ${(line.price * line.quantity).toLocaleString()}
                  </span>
                </div>
                <button
                  className="mt-2 text-xs text-steel hover:text-flare underline"
                  onClick={() => removeLine(line.variantId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-6 space-y-4">
            <div className="flex justify-between font-mono text-sm font-bold">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <p className="text-xs text-steel">
              Shipping and tax calculated at checkout.
            </p>
            <button onClick={handleCheckout} className="btn-flare w-full">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
