export function MaterialSwatch({
  gradient,
  className = "",
}: {
  gradient: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: gradient }}
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
