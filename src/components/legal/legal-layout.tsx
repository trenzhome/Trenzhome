import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow mb-3">Legal</p>
      <h1 className="font-display text-4xl md:text-5xl mb-3">{title}</h1>
      <p className="text-sm text-steel font-mono mb-10">Last updated {lastUpdated}</p>

      <div className="flex gap-3 rounded-2xl bg-fog px-6 py-5 mb-12">
        <AlertTriangle size={18} strokeWidth={1.75} className="text-flare shrink-0 mt-0.5" />
        <p className="text-sm text-ink/70 leading-relaxed">
          This page is a working draft describing our actual current practices, provided as a
          starting point rather than finished legal advice. It hasn&rsquo;t been reviewed by a
          lawyer — have counsel review it before relying on it for compliance.
        </p>
      </div>

      <div className="prose-legal space-y-8">{children}</div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl mb-4">{title}</h2>
      <div className="space-y-4 text-ink/80 leading-relaxed">{children}</div>
    </section>
  );
}
