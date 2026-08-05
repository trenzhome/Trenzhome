import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = { title: "Accessibility Statement" };

export default function AccessibilityPage() {
  return (
    <LegalLayout title="Accessibility Statement" lastUpdated="August 5, 2026">
      <LegalSection title="Our Commitment">
        <p>
          We want trenzhome.com to be usable by as many people as possible, including people using
          screen readers, keyboard-only navigation, or browsing with reduced motion. This page
          describes what we&rsquo;ve done and what&rsquo;s still in progress — honestly, rather than
          claiming a compliance level we haven&rsquo;t independently verified.
        </p>
      </LegalSection>

      <LegalSection title="What We've Built In">
        <ul className="list-disc pl-5 space-y-2">
          <li>Semantic HTML and landmark elements (nav, main, footer) throughout the site</li>
          <li>Visible keyboard focus indicators on every interactive element</li>
          <li>Descriptive labels on icon-only buttons (search, cart, wishlist, quantity controls, and similar)</li>
          <li>Respect for your operating system&rsquo;s reduced-motion preference — animations are minimized automatically if you have that setting enabled</li>
          <li>Keyboard-operable navigation, accordions, and product filters — none of the interactive UI is mouse-only</li>
          <li>Sufficient color contrast targeted throughout the design system</li>
        </ul>
      </LegalSection>

      <LegalSection title="What We Haven't Done Yet">
        <p>
          We haven&rsquo;t completed a formal WCAG audit or third-party accessibility testing, so we
          don&rsquo;t claim a specific conformance level (e.g. WCAG 2.1 AA) at this time. We&rsquo;re
          treating this as an ongoing process rather than a one-time checkbox.
        </p>
      </LegalSection>

      <LegalSection title="Known Limitations">
        <p>
          Some content — like the material swatch imagery used as a stand-in for product photography —
          is decorative and may not have exhaustive alt text yet. If you hit a specific barrier, tell
          us and we&rsquo;ll prioritize it.
        </p>
      </LegalSection>

      <LegalSection title="Reporting an Issue">
        <p>
          If you encounter an accessibility barrier anywhere on this site, let us know at{" "}
          <a href="mailto:hello@trenzhome.com" className="underline hover:text-flare">hello@trenzhome.com</a> with
          the page and a description of the issue — we read every report and will address it.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
