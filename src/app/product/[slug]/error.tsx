"use client";

import { useEffect } from "react";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product page failed to load:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <p className="eyebrow mb-3">Temporarily Unavailable</p>
      <h1 className="font-display text-3xl mb-4">We couldn&apos;t load this product</h1>
      <p className="text-steel mb-8">
        Something went wrong reaching our catalog. This is usually momentary — please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center justify-center rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-flare transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
