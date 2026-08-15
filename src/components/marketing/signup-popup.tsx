"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const DISMISSED_KEY = "trenzhome-signup-dismissed";
const SHOW_DELAY_MS = 2500;

export function SignupPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY)) return;
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setOpen(false);
    localStorage.setItem(DISMISSED_KEY, "1");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 backdrop-blur-sm px-6"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-ink text-paper p-8 text-center shadow-luxury"
          >
            <div className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-flare/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-sand/10 blur-3xl" />

            <button
              type="button"
              aria-label="Close"
              onClick={dismiss}
              className="absolute right-4 top-4 text-paper/60 hover:text-paper transition-colors"
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            <div className="relative z-10">
              <p className="eyebrow text-paper/60 mb-3">Welcome to Trenzhome</p>
              <h2 className="font-display text-xl mb-3">Take 10% off your first order</h2>
              {submitted ? (
                <p className="text-flare font-medium py-2">You&rsquo;re on the list — check your inbox.</p>
              ) : (
                <>
                  <p className="text-paper/60 text-sm mb-5">
                    Sign up for restocks, new arrivals, and a welcome code for your first piece.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                      localStorage.setItem(DISMISSED_KEY, "1");
                    }}
                    className="flex flex-col gap-3"
                  >
                    <input
                      required
                      type="email"
                      placeholder="you@email.com"
                      className="w-full rounded-full bg-paper/10 border border-paper/20 px-5 py-3 text-sm text-paper placeholder:text-paper/40 focus:outline-none focus:border-flare transition-colors"
                    />
                    <button type="submit" className="btn-flare w-full">
                      Get My Code
                    </button>
                  </form>
                  <button
                    type="button"
                    onClick={dismiss}
                    className="mt-4 text-xs text-paper/50 hover:text-paper/80 transition-colors"
                  >
                    No thanks
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
