import Link from "next/link";
import { Gem, Truck, Undo2, ShieldCheck, ArrowRight } from "lucide-react";

const POINTS = [
  {
    icon: Gem,
    title: "Honest Materials",
    copy: "One real material per piece, named and sourced — never a synthetic stand-in.",
    href: "/materials",
    linkLabel: "Explore Materials",
  },
  {
    icon: Truck,
    title: "White-Glove Delivery",
    copy: "Assembled and placed in the room of your choice, packaging removed same day.",
    href: "/customer-service#shipping",
    linkLabel: "Shipping Details",
  },
  {
    icon: Undo2,
    title: "30-Day Trial",
    copy: "Live with it. Return within 30 days for a full refund, no restocking fee.",
    href: "/customer-service#returns",
    linkLabel: "Return Policy",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last",
    copy: "Every frame and finish is warrantied for a minimum of five years.",
    href: "/trade",
    linkLabel: "Trade & Warranty",
  },
];

export function TrustStrip() {
  return (
    <section className="border-t border-ink/10 bg-fog">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {POINTS.map(({ icon: Icon, title, copy, href, linkLabel }) => (
          <div
            key={title}
            className="group rounded-2xl border border-ink/10 bg-paper p-6 transition-shadow duration-300 hover:shadow-soft"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-fog text-flare mb-5">
              <Icon size={20} strokeWidth={1.5} />
            </span>
            <p className="font-display text-base mb-2">{title}</p>
            <p className="text-sm text-steel leading-relaxed mb-5">{copy}</p>
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink group-hover:text-flare transition-colors"
            >
              {linkLabel}
              <ArrowRight size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
