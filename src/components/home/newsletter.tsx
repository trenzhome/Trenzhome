"use client";

import { useState } from "react";
import { Reveal } from "./reveal";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto max-w-[1800px] px-6 pb-24 md:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 md:py-24 text-center">
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-flare/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-sand/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-xl">
            <p className="eyebrow text-paper/60 mb-4">Stay in the Loop</p>
            <h2 className="font-display text-3xl md:text-4xl text-paper mb-4">
              First look at every drop
            </h2>
            <p className="text-paper/60 mb-9">
              New arrivals, restocks, and the occasional private sale — no more than twice a month.
            </p>
            {submitted ? (
              <p className="text-flare font-medium">You&rsquo;re on the list.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  required
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 rounded-full bg-paper/10 border border-paper/20 px-6 py-3.5 text-paper placeholder:text-paper/40 focus:outline-none focus:border-flare transition-colors"
                />
                <button type="submit" className="btn-flare shrink-0">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
