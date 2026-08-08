"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";

const CATEGORIES = ["All Categories", "Living", "Dining", "Bedding", "Lighting", "Kitchen & Dining"];

export function SearchBar({ solid }: { solid: boolean }) {
  const router = useRouter();
  const [category, setCategory] = useState("All Categories");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "All Categories") params.set("category", category.toLowerCase());
    router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={submit}
      className={`hidden lg:flex items-stretch flex-1 max-w-xl mx-8 rounded-full border overflow-hidden transition-colors ${
        solid ? "border-ink/15 bg-paper" : "border-paper/30 bg-paper/10 backdrop-blur-glass"
      }`}
    >
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className={`flex h-full items-center gap-1.5 px-4 text-xs font-medium border-r whitespace-nowrap transition-colors ${
            solid ? "border-ink/10 text-ink/70 hover:text-flare" : "border-paper/20 text-paper/70 hover:text-paper"
          }`}
        >
          {category}
          <ChevronDown size={12} strokeWidth={2} />
        </button>
        {open && (
          <div className="absolute left-0 top-full mt-2 w-48 rounded-xl bg-paper shadow-luxury ring-1 ring-ink/5 py-2 z-20">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onMouseDown={() => {
                  setCategory(c);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-ink hover:text-flare transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What are you looking for?"
        className={`min-w-0 flex-1 bg-transparent px-4 text-sm focus:outline-none ${
          solid ? "text-ink placeholder:text-steel" : "text-paper placeholder:text-paper/50"
        }`}
      />
      <button
        type="submit"
        aria-label="Search"
        className={`flex items-center justify-center px-4 transition-colors ${
          solid ? "text-ink hover:text-flare" : "text-paper hover:text-flare"
        }`}
      >
        <Search size={16} strokeWidth={1.75} />
      </button>
    </form>
  );
}
