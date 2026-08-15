"use client";

import { useState } from "react";
import { User, Package, MapPin, CreditCard, Gift, Bell } from "lucide-react";

const UPCOMING = [
  { icon: Package, label: "Order History" },
  { icon: MapPin, label: "Saved Addresses" },
  { icon: CreditCard, label: "Payment Methods" },
  { icon: Gift, label: "Gift Cards & Rewards" },
  { icon: Bell, label: "Notification Preferences" },
];

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-[1800px] px-6 py-10">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="eyebrow mb-3">Account</p>
          <h1 className="font-display text-3xl mb-6">Sign In</h1>
          <p className="text-steel max-w-md mb-10 leading-relaxed">
            Account sign-in isn&rsquo;t live yet — we&rsquo;re building it out. In the
            meantime, your <a href="/wishlist" className="underline hover:text-flare">wishlist</a> is
            already saved to this device, and checkout works as a guest.
          </p>

          <div className="rounded-2xl border border-ink/10 p-8 max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fog">
                <User size={18} strokeWidth={1.75} className="text-steel" />
              </span>
              <p className="font-medium">Get notified when accounts launch</p>
            </div>
            {submitted ? (
              <p className="text-flare font-medium">You&rsquo;re on the list — we&rsquo;ll email you.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 rounded-full border border-ink/15 px-5 py-3 text-sm focus:outline-none focus:border-flare"
                />
                <button type="submit" className="btn-flare shrink-0">
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-fog p-8">
          <p className="eyebrow mb-6">Coming to Your Account</p>
          <ul className="space-y-4">
            {UPCOMING.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper shadow-soft shrink-0">
                  <Icon size={16} strokeWidth={1.75} className="text-steel" />
                </span>
                <span className="text-ink/80">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
