import Link from "next/link";

const COLUMNS = [
  {
    title: "Shop",
    links: ["Living", "Bedding", "Dining", "Lighting", "New Arrivals", "Sale"],
  },
  {
    title: "Support",
    links: ["Contact", "Shipping", "Returns", "FAQ", "Track Order"],
  },
  {
    title: "Company",
    links: ["About", "Journal", "Sustainability", "Careers"],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <p className="font-display text-3xl mb-3">TRENZHOME</p>
          <p className="text-sm text-paper/60 max-w-xs">
            Furniture and home goods built from honest materials, made to
            outlast the trend cycle.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-paper/50 mb-4">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm font-bold text-paper/80 hover:text-flare transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-paper/10 px-6 py-6 text-center text-xs text-paper/50 font-mono">
        © {new Date().getFullYear()} TRENZHOME. All rights reserved.
      </div>
    </footer>
  );
}
