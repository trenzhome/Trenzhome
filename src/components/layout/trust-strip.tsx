import { Gem, Truck, Undo2, ShieldCheck } from "lucide-react";

const POINTS = [
  {
    icon: Gem,
    title: "Honest Materials",
    copy: "One real material per piece, named and sourced — never a synthetic stand-in.",
  },
  {
    icon: Truck,
    title: "White-Glove Delivery",
    copy: "Assembled and placed in the room of your choice, packaging removed same day.",
  },
  {
    icon: Undo2,
    title: "30-Day Trial",
    copy: "Live with it. Return within 30 days for a full refund, no restocking fee.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last",
    copy: "Every frame and finish is warrantied for a minimum of five years.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-t border-ink/10">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-ink/10 lg:divide-y-0 lg:divide-x">
        {POINTS.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex gap-4 py-6 lg:py-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
            <Icon size={22} strokeWidth={1.5} className="shrink-0 text-flare mt-0.5" />
            <div>
              <p className="font-display text-base mb-1.5">{title}</p>
              <p className="text-sm text-steel leading-relaxed">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
