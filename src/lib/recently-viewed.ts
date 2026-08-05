const STORAGE_KEY = "trenzhome:recently-viewed";
const MAX_ENTRIES = 8;

export function recordRecentlyViewed(slug: string) {
  if (typeof window === "undefined") return;
  try {
    const current = readRecentlyViewed();
    const next = [slug, ...current.filter((s) => s !== slug)].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable (private browsing, etc.) — not worth surfacing to the user
  }
}

export function readRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}
