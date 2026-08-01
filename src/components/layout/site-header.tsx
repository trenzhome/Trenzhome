"use client";

import Link from "next/link";
import { Search, Heart, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";

const NAV_LINKS = [
  { label: "Living", href: "/shop?category=living" },
  { label: "Bedding", href: "/shop?category=bedding" },
  { label: "Dining", href: "/shop?category=dining" },
  { label: "Lighting", href: "/shop?category=lighting" },
  { label: "New Arrivals", href: "/shop?sort=new" },
  { label: "Sale", href: "/shop?sale=true" },
];

export function SiteHeader() {
  const { count, openCart } = useCart();

  return (
    <>
      <div className="bg-flare text-ink text-center text-xs font-bold uppercase tracking-widest2 py-2">
        Free shipping over $150 — new drops every Thursday
      </div>
      <header className="sticky top-0 z-40 bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            <Link
              href="/"
              className="font-display text-3xl tracking-tight text-paper"
            >
              TRENZHOME
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-wide text-paper/80 hover:text-flare transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-5 text-paper">
              <button aria-label="Search" className="hover:text-flare transition-colors">
                <Search size={19} strokeWidth={2} />
              </button>
              <Link href="/account" aria-label="Account" className="hover:text-flare transition-colors">
                <User size={19} strokeWidth={2} />
              </Link>
              <Link href="/wishlist" aria-label="Wishlist" className="hover:text-flare transition-colors">
                <Heart size={19} strokeWidth={2} />
              </Link>
              <button
                aria-label="Open cart"
                onClick={openCart}
                className="relative hover:text-flare transition-colors"
              >
                <ShoppingBag size={19} strokeWidth={2} />
                {count > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-flare text-[10px] text-ink font-bold font-mono">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
