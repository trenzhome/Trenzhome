import Link from "next/link";
import { MaterialSwatch } from "@/components/product/material-swatch";

export interface MegaMenuTile {
  label: string;
  href: string;
  swatch?: string;
}

export interface MegaMenuPromo {
  eyebrow: string;
  label: string;
  href: string;
  swatch: string;
}

export function MegaMenu({ tiles, promo }: { tiles: MegaMenuTile[]; promo: MegaMenuPromo }) {
  return (
    <div className="glass-panel rounded-2xl p-6 flex items-stretch gap-6 text-ink">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 min-w-[280px]">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href} className="group flex items-center gap-3">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
              {tile.swatch ? (
                <MaterialSwatch
                  gradient={tile.swatch}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-fog text-[10px] font-bold text-ink">
                  All
                </span>
              )}
            </span>
            <span className="text-sm font-medium whitespace-nowrap group-hover:text-flare transition-colors">
              {tile.label}
            </span>
          </Link>
        ))}
      </div>
      <div className="w-px bg-ink/10" />
      <Link
        href={promo.href}
        className="group relative block w-36 shrink-0 aspect-[3/4] overflow-hidden rounded-xl"
      >
        <MaterialSwatch
          gradient={promo.swatch}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-paper/70 mb-0.5">
            {promo.eyebrow}
          </p>
          <p className="font-display text-sm text-paper leading-tight">{promo.label}</p>
        </div>
      </Link>
    </div>
  );
}
