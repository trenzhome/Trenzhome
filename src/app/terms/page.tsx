import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="August 5, 2026">
      <LegalSection title="Agreement to Terms">
        <p>
          By placing an order or otherwise using trenzhome.com, you agree to these terms. If you
          don&rsquo;t agree, please don&rsquo;t use the site to make a purchase.
        </p>
      </LegalSection>

      <LegalSection title="Orders and Payment">
        <p>
          All prices are listed in AUD and are shown at checkout before you pay. Payment is processed
          through Shopify at the time of order. We reserve the right to cancel any order — for example
          if an item is out of stock despite showing as available, or if we suspect fraud — and will
          refund you in full if we do.
        </p>
        <p>Order confirmation does not guarantee stock availability until payment has been captured.</p>
      </LegalSection>

      <LegalSection title="Shipping and Delivery">
        <p>
          Estimated delivery windows shown on product and checkout pages are estimates, not guarantees.
          See our <Link href="/shipping-policy" className="underline hover:text-flare">Shipping Policy</Link> for full detail.
        </p>
      </LegalSection>

      <LegalSection title="Returns and Refunds">
        <p>
          See our <Link href="/refund-policy" className="underline hover:text-flare">Refund Policy</Link> for
          the full terms governing returns, exchanges, and refunds.
        </p>
      </LegalSection>

      <LegalSection title="Product Descriptions">
        <p>
          We aim for accuracy in product descriptions, dimensions, and material information, but
          natural materials (stone, wood, linen) vary piece to piece — the exact item you receive may
          differ slightly from photos in grain, veining, or texture. We don&rsquo;t warrant that
          descriptions are error-free.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          All content on this site — text, design, layout, and original photography where used — is
          owned by Trenzhome or its licensors. You may not reproduce or redistribute it commercially
          without permission.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the extent permitted by law, Trenzhome is not liable for indirect, incidental, or
          consequential damages arising from use of this site or its products, beyond the purchase
          price of the relevant order. Nothing in these terms excludes rights that can&rsquo;t be
          excluded under Australian Consumer Law.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>These terms are governed by the laws of Victoria, Australia.</p>
      </LegalSection>

      <LegalSection title="Changes to These Terms">
        <p>We may update these terms from time to time; the date at the top of this page reflects the most recent version.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms: <a href="mailto:hello@trenzhome.com" className="underline hover:text-flare">hello@trenzhome.com</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
