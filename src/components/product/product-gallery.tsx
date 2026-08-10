"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from "lucide-react";

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  const active = images[index] ?? images[0];

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-ink flex flex-col" : "relative"}>
      {isFullscreen && (
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            aria-label="Exit fullscreen"
            className="text-paper hover:text-flare transition-colors"
          >
            <Minimize2 size={22} />
          </button>
        </div>
      )}

      <div
        className={
          isFullscreen
            ? "relative flex-1 flex items-center justify-center px-8 pb-8"
            : "relative aspect-[4/5] rounded-2xl overflow-hidden shadow-soft"
        }
      >
        <div className={isFullscreen ? "relative w-full max-w-xl aspect-[4/5]" : "relative h-full w-full"}>
          <Image
            src={active}
            alt={title}
            fill
            sizes={isFullscreen ? "90vw" : "(min-width: 768px) 50vw, 100vw"}
            className="object-cover"
            priority
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink shadow-soft hover:text-flare transition-colors"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink shadow-soft hover:text-flare transition-colors"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </>
        )}
      </div>

      <div className={`flex items-center gap-3 ${isFullscreen ? "justify-center pb-6" : "mt-3"}`}>
        {images.length > 1 && (
          <div className="flex items-center gap-2">
            {images.map((img, i) => (
              <button
                key={img + i}
                type="button"
                aria-label={`View image ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`relative h-12 w-12 overflow-hidden rounded-lg ring-2 transition-colors ${
                  i === index ? "ring-flare" : "ring-transparent hover:ring-ink/20"
                }`}
              >
                <Image src={img} alt="" fill sizes="48px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsFullscreen((v) => !v)}
          aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          className="ml-auto flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-steel hover:text-flare transition-colors"
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          {isFullscreen ? "Exit" : "Fullscreen"}
        </button>
      </div>
    </div>
  );
}
