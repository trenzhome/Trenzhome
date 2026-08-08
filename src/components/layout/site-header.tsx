"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchBar } from "@/components/layout/search-bar";
import { MegaMenu, type MegaMenuTile, type MegaMenuPromo } from "@/components/layout/mega-menu";
import { products } from "@/lib/products";
import { rooms } from "@/lib/rooms";

const SHOP_CATEGORY_LINKS = [
  { label: "Living", href: "/shop?category=living" },
  { label: "Dining", href: "/shop?category=dining" },
  { label: "Bedding", href: "/shop?category=bedding" },
  { label: "Lighting", href: "/shop?category=lighting" },
  { label: "Kitchen & Dining", href: `/shop?category=${encodeURIComponent("kitchen & dining")}` },
];

const SHOP_TILES: MegaMenuTile[] = [
  { ...SHOP_CATEGORY_LINKS[0], swatch: products[0].swatch },
  { ...SHOP_CATEGORY_LINKS[1], swatch: products[1].swatch },
  { ...SHOP_CATEGORY_LINKS[2], swatch: products[2].swatch },
  { ...SHOP_CATEGORY_LINKS[3], swatch: products[3].swatch },
  { ...SHOP_CATEGORY_LINKS[4], swatch: products[5].swatch },
  { label: "All Products", href: "/shop" },
];

const SHOP_PROMO: MegaMenuPromo = {
  eyebrow: "New",
  label: "Shop the Edit",
  href: "/shop?sort=new",
  swatch: products[0].swatch,
};

const ROOM_TILES: MegaMenuTile[] = [
  ...rooms.slice(0, 7).map((r) => ({ label: r.name, href: `/rooms/${r.slug}`, swatch: r.heroSwatch })),
  { label: "All Rooms", href: "/rooms" },
];

const ROOM_PROMO: MegaMenuPromo = {
  eyebrow: "Curated",
  label: "Shop by Room",
  href: "/rooms",
  swatch: products[4].swatch,
};

const NAV_LINKS = [
  { label: "Shop", href: "/shop", menu: { tiles: SHOP_TILES, promo: SHOP_PROMO } },
  { label: "Rooms", href: "/rooms", menu: { tiles: ROOM_TILES, promo: ROOM_PROMO } },
  { label: "Materials", href: "/materials" },
  { label: "Journal", href: "/journal" },
  { label: "New Arrivals", href: "/shop?sort=new", badge: { text: "New", tone: "new" as const } },
  { label: "Sale", href: "/shop?sale=true", badge: { text: "Sale", tone: "sale" as const } },
];

const ANNOUNCEMENTS = [
  "Complimentary shipping over $150",
  "New arrivals every Thursday",
  "30-day trial on every order",
];

function NavBadge({ badge }: { badge: { text: string; tone: "new" | "sale" } }) {
  return (
    <span
      className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
        badge.tone === "sale" ? "bg-flare/15 text-flare" : "bg-moss/15 text-moss"
      }`}
    >
      {badge.text}
    </span>
  );
}

export function SiteHeader() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [annIndex, setAnnIndex] = useState(0);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnIndex((i) => (i + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-40">
      <div className="relative h-9 flex items-center justify-center bg-ink text-paper/80 text-center text-[11px] font-mono uppercase tracking-widest2 px-12">
        <button
          type="button"
          aria-label="Previous announcement"
          onClick={() => setAnnIndex((i) => (i - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)}
          className="absolute left-4 md:left-6 hover:text-paper transition-colors"
        >
          <ChevronLeft size={13} strokeWidth={2} />
        </button>
        <AnimatePresence mode="wait">
          <motion.span
            key={annIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {ANNOUNCEMENTS[annIndex]}
          </motion.span>
        </AnimatePresence>
        <button
          type="button"
          aria-label="Next announcement"
          onClick={() => setAnnIndex((i) => (i + 1) % ANNOUNCEMENTS.length)}
          className="absolute right-4 md:right-6 hover:text-paper transition-colors"
        >
          <ChevronRight size={13} strokeWidth={2} />
        </button>
      </div>

      <header
        className={`transition-colors duration-500 ${
          solid ? "glass-panel" : "bg-transparent border-b border-transparent"
        } ${!solid ? "text-paper" : "text-ink"}`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center gap-4">
            <Link href="/" className="font-display text-2xl md:text-3xl tracking-tight shrink-0">
              Trenzhome
            </Link>

            <SearchBar solid={solid} />

            <div className="flex items-center gap-5 ml-auto">
              <span
                className={`hidden md:flex items-center gap-1.5 text-xs font-medium ${
                  solid ? "text-steel" : "text-paper/70"
                }`}
              >
                <Globe size={15} strokeWidth={1.75} />
                United States &middot; USD $
              </span>
              <button
                aria-label="Open search"
                onClick={() => setSearchOpen(true)}
                className="lg:hidden hover:text-flare transition-colors"
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

          <nav
            className="hidden md:flex items-center gap-9 h-12 border-t border-current/10"
            onMouseLeave={() => setOpenMenu(null)}
          >
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative h-full flex items-center"
                onMouseEnter={() => setOpenMenu(link.menu ? link.label : null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1.5 text-sm font-medium tracking-wide opacity-90 hover:opacity-100 hover:text-flare transition-colors"
                >
                  {link.label}
                  {"badge" in link && link.badge && <NavBadge badge={link.badge} />}
                  {link.menu && <ChevronDown size={13} strokeWidth={2} />}
                </Link>

                <AnimatePresence>
                  {link.menu && openMenu === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-0"
                    >
                      <MegaMenu tiles={link.menu.tiles} promo={link.menu.promo} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
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
              {[
                ...SHOP_CATEGORY_LINKS,
                { label: "Rooms", href: "/rooms" },
                { label: "Materials", href: "/materials" },
                { label: "Journal", href: "/journal" },
                { label: "New Arrivals", href: "/shop?sort=new", badge: { text: "New", tone: "new" as const } },
                { label: "Sale", href: "/shop?sale=true", badge: { text: "Sale", tone: "sale" as const } },
                { label: "Account", href: "/account" },
                { label: "Wishlist", href: "/wishlist" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 font-display text-3xl"
                >
                  {link.label}
                  {"badge" in link && link.badge && <NavBadge badge={link.badge} />}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
