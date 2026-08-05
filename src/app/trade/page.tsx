"use client";

import { useState } from "react";
import { Building2, Percent, Truck, Gift } from "lucide-react";

const PROGRAMS = [
  {
    icon: Building2,
    title: "Trade Program",
    body: "For interior designers and architects: trade pricing, dedicated support, and access to materials ahead of general release.",
  },
  {
    icon: Percent,
    title: "Wholesale",
    body: "Volume pricing for retailers and hospitality buyers furnishing multiple spaces at once.",
  },
  {
    icon: Truck,
    title: "Retail Partners",
    body: "Stock Trenzhome in your showroom. We handle logistics; you handle the relationship with your customer.",
  },
  {
    icon: Gift,
    title: "Corporate Gifts",
    body: "Bulk ordering for client and employee gifting, with consolidated invoicing for finance teams.",
  },
];

export default function TradePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="eyebrow mb-3">Business</p>
      <h1 className="font-display text-5xl mb-4">Trade &amp; Wholesale</h1>
      <p className="text-steel max-w-lg mb-16">
        For designers, retailers, hospitality buyers, and companies furnishing at scale.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-20">
        {PROGRAMS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card-luxury p-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fog mb-5">
              <Icon size={18} strokeWidth={1.75} className="text-steel" />
            </span>
            <h3 className="font-display text-xl mb-2">{title}</h3>
            <p className="text-sm text-steel leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="max-w-xl">
        <h2 className="font-display text-2xl mb-6">Apply for Access</h2>
        {submitted ? (
          <div className="rounded-2xl bg-fog p-8">
            <p className="font-medium mb-2">Application received</p>
            <p className="text-steel text-sm">
              We review applications within 3 business days and will follow up by email.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs uppercase tracking-wide text-steel mb-2 block">Business Name</label>
                <input required type="text" className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-flare" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-steel mb-2 block">Business Email</label>
                <input required type="email" className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-flare" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-steel mb-2 block">Program</label>
              <select required className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-flare bg-transparent">
                <option value="">Select one</option>
                {PROGRAMS.map((p) => (
                  <option key={p.title} value={p.title}>{p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-steel mb-2 block">Tell us about your business</label>
              <textarea required rows={4} className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-flare resize-none" />
            </div>
            <button type="submit" className="btn-flare">
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
