"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";

const SHOP_MENU = [
  { label: "Living", href: "/shop?category=living" },
  { label: "Bedding", href: "/shop?category=bedding" },
  { label: "Dining", href: "/shop?category=dining" },
  { label: "Lighting", href: "/shop?category=lighting" },
];

const NAV_LINKS = [
  { label: "Shop", href: "/shop", menu: SHOP_MENU },
  { label: "New Arrivals", href: "/shop?sort=new" },
  { label: "Sale", href: "/shop?sale=true" },
];

export function SiteHeader() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const solid = scrolled || !isHome;

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-40">
      <div className="h-9 flex items-center justify-center bg-ink text-paper/80 text-center text-[11px] font-mono uppercase tracking-widest2">
        Complimentary shipping over $150 &middot; New arrivals every Thursday
      </div>

      <header
        className={`h-20 transition-colors duration-500 ${
          solid ? "glass-panel" : "bg-transparent border-b border-transparent"
        } ${!solid ? "text-paper" : "text-ink"}`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="font-display text-2xl md:text-3xl tracking-tight">
              Trenzhome
            </Link>

            <nav
              className="hidden md:flex items-center gap-9"
              onMouseLeave={() => setOpenMenu(null)}
            >
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(link.menu ? link.label : null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium tracking-wide opacity-90 hover:opacity-100 hover:text-flare transition-colors"
                  >
                    {link.label}
                    {link.menu && <ChevronDown size={13} strokeWidth={2} />}
                  </Link>

                  <AnimatePresence>
                    {link.menu && openMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                      >
                        <div className="glass-panel rounded-2xl p-6 flex gap-8 text-ink whitespace-nowrap">
                          {link.menu.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="text-sm font-medium hover:text-flare transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              <button
                aria-label="Open search"
                onClick={() => setSearchOpen(true)}
                className="hover:text-flare transition-colors"
              >
                <Search size={19} strokeWidth={1.75} />
              </button>
              <Link href="/account" aria-label="Account" className="hidden sm:inline hover:text-flare transition-colors">
                <User size={19} strokeWidth={1.75} />
              </Link>
              <Link href="/wishlist" aria-label="Wishlist" className="hidden sm:inline hover:text-flare transition-colors">
                <Heart size={19} strokeWidth={1.75} />
              </Link>
              <button
                aria-label="Open cart"
                onClick={openCart}
                className="relative hover:text-flare transition-colors"
              >
                <ShoppingBag size={19} strokeWidth={1.75} />
                {count > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-flare text-[10px] text-paper font-bold font-mono">
                    {count}
                  </span>
                )}
              </button>
              <button
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="md:hidden hover:text-flare transition-colors"
              >
                <Menu size={21} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </header>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 glass-dark flex items-start justify-center pt-32 px-6"
            onClick={() => setSearchOpen(false)}
          >
            <motion.form
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              action="/shop"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl"
            >
              <div className="flex items-center gap-4 border-b-2 border-paper/40 pb-4">
                <Search className="text-paper" size={22} strokeWidth={1.75} />
                <input
                  autoFocus
                  name="q"
                  type="text"
                  placeholder="Search products, materials, rooms..."
                  className="flex-1 bg-transparent text-paper text-xl font-display placeholder:text-paper/40 focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="text-paper/70 hover:text-flare transition-colors"
                >
                  <X size={22} strokeWidth={1.75} />
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-paper flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-ink/10">
              <span className="font-display text-2xl">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="hover:text-flare transition-colors"
              >
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
              {[...SHOP_MENU, { label: "New Arrivals", href: "/shop?sort=new" }, { label: "Sale", href: "/shop?sale=true" }, { label: "Account", href: "/account" }, { label: "Wishlist", href: "/wishlist" }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-display text-3xl"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
