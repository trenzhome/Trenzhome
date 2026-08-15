import type { CSSProperties } from "react";

export function MaterialSwatch({
  gradient,
  className = "",
  style,
}: {
  gradient: string;
  className?: string;
  style?: CSSProperties;
}) {
  // Tailwind resolves `relative` vs `absolute` by stylesheet order, not by
  // where the class appears in this string — so a hardcoded `relative` here
  // would silently win over an `absolute` passed in via `className`, leaving
  // the element in normal document flow instead of positioned. Only fall
  // back to `relative` when the caller hasn't already set a position.
  const hasPosition = /\b(absolute|fixed|sticky|static)\b/.test(className);

  return (
    <div
      className={`${hasPosition ? "" : "relative"} overflow-hidden ${className}`}
      style={{ background: gradient, ...style }}
    >
      {/* subtle woven-texture overlay so swatches read as material, not flat color */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 6px)",
        }}
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
    </div>
  );
}
