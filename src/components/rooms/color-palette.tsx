import { RoomPalette } from "@/lib/rooms";
import { Reveal } from "@/components/home/reveal";

export function ColorPalette({ palette }: { palette: RoomPalette[] }) {
  return (
    <div>
      <p className="eyebrow mb-6">Color Palette</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {palette.map((color, i) => (
          <Reveal key={color.hex} delay={i * 0.06}>
            <div>
              <div
                className="aspect-square rounded-2xl shadow-soft ring-1 ring-inset ring-ink/10"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-sm font-medium mt-3">{color.name}</p>
              <p className="text-xs text-steel font-mono uppercase">{color.hex}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
