import { Check } from "lucide-react";
import { Reveal } from "@/components/home/reveal";

export function StyleGuide({ tips }: { tips: string[] }) {
  return (
    <div>
      <p className="eyebrow mb-6">Style Guide</p>
      <ul className="space-y-4 max-w-xl">
        {tips.map((tip, i) => (
          <Reveal key={tip} delay={i * 0.06}>
            <li className="flex gap-3">
              <Check size={18} strokeWidth={2} className="text-flare shrink-0 mt-0.5" />
              <span className="text-ink/80 leading-relaxed">{tip}</span>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
