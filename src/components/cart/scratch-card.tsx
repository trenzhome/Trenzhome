"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Sparkles } from "lucide-react";

const REVEAL_THRESHOLD = 0.4;

export function ScratchCard({
  code,
  percentage,
  onReveal,
}: {
  code: string;
  percentage: number;
  onReveal: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scratching = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "#CBBB94");
      gradient.addColorStop(0.5, "#DED6C2");
      gradient.addColorStop(1, "#A9835A");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.font = "600 13px var(--font-mono), monospace";
      ctx.fillStyle = "rgba(22, 21, 18, 0.35)";
      ctx.textAlign = "center";
      for (let y = 20; y < rect.height; y += 28) {
        ctx.fillText("SCRATCH HERE", rect.width / 2, y);
      }
    };
    resize();

    const scratchAt = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    };

    const getPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const checkRevealPercent = () => {
      const { width, height } = canvas;
      if (!width || !height) return;
      const data = ctx.getImageData(0, 0, width, height).data;
      let cleared = 0;
      const step = 4 * 8;
      let sampled = 0;
      for (let i = 3; i < data.length; i += step) {
        sampled++;
        // Anti-aliasing/compositing rounding means fully-erased pixels land
        // near 0 rather than exactly 0, so use a small tolerance.
        if (data[i] < 15) cleared++;
      }
      if (sampled > 0 && cleared / sampled > REVEAL_THRESHOLD) {
        setRevealed(true);
        onReveal();
      }
    };

    const onDown = (e: PointerEvent) => {
      scratching.current = true;
      const { x, y } = getPos(e);
      scratchAt(x, y);
    };
    const onMove = (e: PointerEvent) => {
      if (!scratching.current) return;
      const { x, y } = getPos(e);
      scratchAt(x, y);
    };
    const onUp = () => {
      if (scratching.current) {
        scratching.current = false;
        checkRevealPercent();
      }
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("resize", resize);

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyCode = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-24 overflow-hidden rounded-xl bg-ink text-paper select-none touch-none"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <p className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-flare">
          <Sparkles size={13} strokeWidth={2} />
          {percentage}% Off Unlocked
        </p>
        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-1.5 rounded-full bg-paper/10 border border-paper/20 px-3 py-1 font-mono text-sm tracking-widest hover:bg-paper/15 transition-colors"
        >
          {code}
          {copied ? (
            <Check size={13} className="text-flare" />
          ) : (
            <Copy size={13} className="text-paper/60" />
          )}
        </button>
      </div>

      <motion.canvas
        ref={canvasRef}
        animate={revealed ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ pointerEvents: revealed ? "none" : "auto" }}
        className="absolute inset-0 h-full w-full cursor-pointer"
      />
    </div>
  );
}
