import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="August 5, 2026">
      <LegalSection title="Return Window">
        <p>
          You may return most items within 30 days of delivery for a refund, provided they&rsquo;re in
          original, unused condition with any original packaging. To start a return, use our{" "}
          <Link href="/contact" className="underline hover:text-flare">Contact form</Link> with your
          order number.
        </p>
      </LegalSection>

      <LegalSection title="What's Excluded">
        <p>
          Custom or made-to-order pieces are final sale and not eligible for return unless faulty. This
          is disclosed on the relevant product page before you order.
        </p>
      </LegalSection>

      <LegalSection title="Condition Requirements">
        <p>
          Returned items must be unused, undamaged, and (where applicable) in original packaging. Items
          showing signs of use, assembly damage, or missing components may be refused or subject to a
          reduced refund reflecting the item&rsquo;s diminished value.
        </p>
      </LegalSection>

      <LegalSection title="Refund Method and Timing">
        <p>
          Once we receive and inspect your return, we&rsquo;ll issue a refund to your original payment
          method within 5–7 business days. Original shipping charges are non-refundable except where
          the return is due to our error (wrong item sent, defective product).
        </p>
      </LegalSection>

      <LegalSection title="Faulty or Damaged Items">
        <p>
          If an item arrives damaged or develops a fault covered by our{" "}
          <Link href="/customer-service#warranty" className="underline hover:text-flare">warranty</Link>,
          contact us with photos and your order number — we&rsquo;ll arrange a replacement, repair, or
          refund at no cost to you, including return shipping.
        </p>
      </LegalSection>

      <LegalSection title="Statutory Rights">
        <p>
          Nothing in this policy limits your rights under Australian Consumer Law, which guarantees
          apply regardless of any return window stated here.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Start a return or ask a question: <a href="mailto:hello@trenzhome.com" className="underline hover:text-flare">hello@trenzhome.com</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
