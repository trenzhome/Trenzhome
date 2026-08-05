import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Living", href: "/shop?category=living" },
      { label: "Bedding", href: "/shop?category=bedding" },
      { label: "Dining", href: "/shop?category=dining" },
      { label: "Lighting", href: "/shop?category=lighting" },
      { label: "New Arrivals", href: "/shop?sort=new" },
      { label: "Sale", href: "/shop?sale=true" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Rooms", href: "/rooms" },
      { label: "Materials", href: "/materials" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Shipping", href: "/customer-service#shipping" },
      { label: "Returns", href: "/customer-service#returns" },
      { label: "FAQ", href: "/customer-service#faq" },
      { label: "Track Order", href: "/customer-service#track-order" },
      { label: "Warranty", href: "/customer-service#warranty" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Journal", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Trade & Wholesale", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper mt-24">
      <div className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-2 md:grid-cols-6 gap-10">
        <div className="col-span-2 md:col-span-2">
          <p className="font-display text-3xl mb-4">Trenzhome</p>
          <p className="text-sm text-paper/60 max-w-xs leading-relaxed mb-6">
            Furniture and home goods built from honest materials, made to
            outlast the trend cycle.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 hover:border-flare hover:text-flare transition-colors"
              >
                <Icon size={15} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="eyebrow text-paper/50 mb-4">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/75 hover:text-flare transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-paper/10 px-6 py-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-paper/50 font-mono">
          <span>&copy; {new Date().getFullYear()} Trenzhome. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-flare transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-flare transition-colors">Terms</Link>
            <Link href="#" className="hover:text-flare transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
