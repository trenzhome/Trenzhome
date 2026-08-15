"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const CHANNELS = [
  { icon: Mail, label: "Email", value: "hello@trenzhome.com" },
  { icon: Phone, label: "Phone", value: "1800 736 466 (AU, Mon–Fri 9am–5pm AEST)" },
  { icon: MapPin, label: "Studio", value: "Melbourne, Australia" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-[1800px] px-6 py-10">
      <p className="eyebrow mb-3">Customer Service</p>
      <h1 className="font-display text-3xl mb-4">Get in Touch</h1>
      <p className="text-steel max-w-lg mb-14">
        Questions about an order, a material, or anything else — we usually reply within one business day.
      </p>

      <div className="grid md:grid-cols-5 gap-16">
        <div className="md:col-span-2 space-y-8">
          {CHANNELS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fog shrink-0">
                <Icon size={16} strokeWidth={1.75} className="text-steel" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-steel mb-1">{label}</p>
                <p className="font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-3">
          {submitted ? (
            <div className="rounded-2xl bg-fog p-10 text-center">
              <p className="font-display text-xl mb-2">Message sent</p>
              <p className="text-steel">Thanks — we&rsquo;ll get back to you within one business day.</p>
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
                  <label className="text-xs uppercase tracking-wide text-steel mb-2 block">Name</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-flare"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide text-steel mb-2 block">Email</label>
                  <input
                    required
                    type="email"
                    className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-flare"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-steel mb-2 block">Order Number (optional)</label>
                <input
                  type="text"
                  placeholder="#1042"
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-flare"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-steel mb-2 block">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-flare resize-none"
                />
              </div>
              <button type="submit" className="btn-flare">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
