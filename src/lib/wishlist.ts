const STORAGE_KEY = "trenzhome:wishlist";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // localStorage unavailable — wishlist state just won't persist this session
  }
}

export function isWishlisted(slug: string): boolean {
  return read().includes(slug);
}

export function readWishlist(): string[] {
  return read();
}

export function toggleWishlisted(slug: string): boolean {
  const current = read();
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  write(next);
  return next.includes(slug);
}
