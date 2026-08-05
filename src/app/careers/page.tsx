"use client";

import { useState } from "react";

const VALUES = [
  { title: "Build for a decade, not a quarter", body: "We'd rather ship one thing well than three things fast. That applies to furniture and to how we work." },
  { title: "Say the honest thing", body: "If a material has a tradeoff, we say so — internally and to customers. No overclaiming." },
  { title: "Small team, real ownership", body: "We're not staffed for anyone to hide in a big org chart. What you own, you actually own." },
];

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="eyebrow mb-3">Careers</p>
      <h1 className="font-display text-5xl mb-6">We&rsquo;re Small, and Growing Carefully</h1>
      <p className="text-steel max-w-lg mb-16 leading-relaxed">
        We don&rsquo;t have open roles listed right now — we hire deliberately, not on a schedule. If
        that changes, the people below will hear first.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {VALUES.map((v) => (
          <div key={v.title} className="card-luxury p-8">
            <h3 className="font-display text-lg mb-3">{v.title}</h3>
            <p className="text-sm text-steel leading-relaxed">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-fog p-10 max-w-xl">
        {submitted ? (
          <p className="text-flare font-medium">You&rsquo;re on the list — we&rsquo;ll reach out when a relevant role opens.</p>
        ) : (
          <>
            <p className="font-medium mb-4">Get notified about future openings</p>
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
                placeholder="you@email.com"
                className="flex-1 rounded-full border border-ink/15 bg-paper px-5 py-3 text-sm focus:outline-none focus:border-flare"
              />
              <button type="submit" className="btn-flare shrink-0">
                Notify Me
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
