import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

const COLUMNS = [
  {
    title: "Shop",
    links: ["Living", "Bedding", "Dining", "Lighting", "New Arrivals", "Sale"],
  },
  {
    title: "Customer Service",
    links: ["Contact", "Shipping", "Returns", "FAQ", "Track Order", "Warranty"],
  },
  {
    title: "Company",
    links: ["About", "Journal", "Sustainability", "Careers", "Trade & Wholesale"],
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
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-paper/75 hover:text-flare transition-colors"
                  >
                    {link}
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
