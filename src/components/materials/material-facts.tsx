import { Check } from "lucide-react";
import { Material } from "@/lib/materials";
import { Reveal } from "@/components/home/reveal";

export function MaterialFacts({ material }: { material: Material }) {
  const sections = [
    { label: "Manufacturing", body: material.manufacturing },
    { label: "Sustainability", body: material.sustainability },
    { label: "Care Guide", body: material.care },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-16 py-10">
      <Reveal direction="left">
        <p className="eyebrow mb-6">Benefits</p>
        <ul className="space-y-4">
          {material.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3">
              <Check size={18} strokeWidth={2} className="text-flare shrink-0 mt-0.5" />
              <span className="text-ink/80 leading-relaxed">{benefit}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal direction="right" delay={0.1}>
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="eyebrow mb-2">{section.label}</p>
              <p className="text-ink/80 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
