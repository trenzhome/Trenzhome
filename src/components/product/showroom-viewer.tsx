"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, RotateCw } from "lucide-react";
import { Hotspot } from "@/types";
import { MaterialSwatch } from "./material-swatch";

const MIN_ZOOM = 0.85;
const MAX_ZOOM = 1.6;
const DRAG_SENSITIVITY = 0.4;
const INERTIA_DECAY = 0.94;
const AUTO_ROTATE_SPEED = 6; // degrees per second
const IDLE_BEFORE_AUTO_ROTATE_MS = 2500;

/**
 * A CSS 3D-transform "turntable" over the product's material swatch. There is
 * no real photography or 3D model behind this — it's the same gradient swatch
 * used everywhere else on the site, mounted on a rotating plane with a
 * lighting/shadow response, so it reads as depth without claiming to show new
 * angles of the product.
 */
export function ShowroomViewer({
  gradient,
  tint,
  hotspots = [],
  onExploreMaterial,
}: {
  gradient: string;
  tint?: string;
  hotspots?: Hotspot[];
  onExploreMaterial?: () => void;
}) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const dragState = useRef<{ dragging: boolean; lastX: number; lastT: number; velocity: number }>({
    dragging: false,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });
  const lastInteractionRef = useRef(Date.now());
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Single animation loop: inertia after a drag release, then idle auto-rotate.
  useEffect(() => {
    if (reducedMotion) return;
    let lastTime = performance.now();

    function tick(now: number) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const state = dragState.current;

      if (!state.dragging) {
        if (Math.abs(state.velocity) > 0.02) {
          state.velocity *= INERTIA_DECAY;
          setRotation((r) => r + state.velocity);
        } else if (Date.now() - lastInteractionRef.current > IDLE_BEFORE_AUTO_ROTATE_MS) {
          setRotation((r) => r + AUTO_ROTATE_SPEED * dt);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  const registerInteraction = useCallback(() => {
    lastInteractionRef.current = Date.now();
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragState.current.dragging = true;
      dragState.current.lastX = e.clientX;
      dragState.current.lastT = performance.now();
      dragState.current.velocity = 0;
      registerInteraction();
    },
    [registerInteraction]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragState.current.dragging) return;
      const now = performance.now();
      const dx = e.clientX - dragState.current.lastX;
      const dt = Math.max(now - dragState.current.lastT, 1);
      const delta = dx * DRAG_SENSITIVITY;
      setRotation((r) => r + delta);
      dragState.current.velocity = (delta / dt) * 16; // normalize to ~per-frame at 60fps
      dragState.current.lastX = e.clientX;
      dragState.current.lastT = now;
      registerInteraction();
    },
    [registerInteraction]
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragState.current.dragging = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      registerInteraction();
      setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z - e.deltaY * 0.001)));
    },
    [registerInteraction]
  );

  // Angle-driven lighting: a highlight that sweeps with rotation and a floor
  // shadow that compresses as the "front" face turns away from camera.
  const angleRad = (rotation * Math.PI) / 180;
  const lightX = 50 + Math.sin(angleRad) * 35;
  const shadowScaleX = 0.55 + Math.abs(Math.cos(angleRad)) * 0.35;

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 bg-ink flex flex-col"
          : "relative"
      }
    >
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
        className={`relative select-none touch-none ${
          isFullscreen ? "flex-1 flex items-center justify-center px-8 pb-8" : "aspect-[4/5]"
        }`}
        style={{ perspective: 1200 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        <div
          className={isFullscreen ? "relative w-full max-w-xl aspect-[4/5]" : "relative h-full w-full"}
          style={{
            transform: `rotateY(${rotation}deg) scale(${zoom})`,
            transformStyle: "preserve-3d",
            cursor: dragState.current.dragging ? "grabbing" : "grab",
          }}
        >
          <MaterialSwatch gradient={gradient} className="h-full w-full" />

          {tint && (
            <div
              className="pointer-events-none absolute inset-0 mix-blend-color transition-colors duration-300"
              style={{ backgroundColor: tint }}
            />
          )}

          {/* rotation-responsive spotlight */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${lightX}% 30%, rgba(255,255,255,0.55), transparent 55%)`,
            }}
          />

          {hotspots.map((h) => (
            <div
              key={h.id}
              className="absolute z-10"
              style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <button
                aria-label={h.label}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot((cur) => (cur === h.id ? null : h.id));
                }}
                className="h-5 w-5 rounded-full bg-flare ring-2 ring-paper shadow-lg animate-pulse hover:animate-none"
              />
              {activeHotspot === h.id && (
                <div className="absolute left-1/2 top-full mt-2 w-48 -translate-x-1/2 bg-ink text-paper text-xs p-3 z-20 shadow-xl">
                  <p className="font-bold uppercase tracking-wide mb-1">{h.label}</p>
                  <p className="text-paper/70">{h.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* floor shadow, compresses with rotation angle */}
        <div
          className="pointer-events-none absolute left-1/2 bottom-0 h-4 bg-ink/25 blur-md rounded-full"
          style={{
            width: "70%",
            transform: `translateX(-50%) scaleX(${shadowScaleX})`,
          }}
        />
      </div>

      <div
        className={`flex items-center gap-3 ${
          isFullscreen ? "justify-center pb-6" : "mt-3"
        }`}
      >
        <button
          type="button"
          onClick={() => {
            registerInteraction();
            setRotation((r) => r + 90);
          }}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-steel hover:text-flare transition-colors"
        >
          <RotateCw size={14} /> Rotate
        </button>
        {onExploreMaterial && (
          <button
            type="button"
            onClick={onExploreMaterial}
            className="text-xs font-bold uppercase tracking-wide text-steel hover:text-flare transition-colors"
          >
            Explore Material
          </button>
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
