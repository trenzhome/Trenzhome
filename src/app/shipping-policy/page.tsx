import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <LegalLayout title="Shipping Policy" lastUpdated="August 5, 2026">
      <LegalSection title="Where We Ship">
        <p>
          We currently ship within Australia only. International shipping isn&rsquo;t available yet —
          see our <Link href="/customer-service" className="underline hover:text-flare">Customer Service</Link> page
          for the latest.
        </p>
      </LegalSection>

      <LegalSection title="Delivery Estimates">
        <p>
          Standard delivery arrives in 5–9 business days from dispatch, shown as an estimated date
          range on each product page. These are estimates based on typical carrier performance, not
          guaranteed delivery dates — delays can occur due to carrier volume, weather, or remote
          delivery addresses.
        </p>
      </LegalSection>

      <LegalSection title="Shipping Costs">
        <p>
          Shipping is free on orders over $150 AUD. Orders below that threshold are charged shipping
          calculated at checkout based on order size and delivery address.
        </p>
      </LegalSection>

      <LegalSection title="White-Glove Delivery">
        <p>
          For large furniture, white-glove delivery (in-room placement and packaging removal) is
          available as a checkout option for an additional fee, where offered for that product.
        </p>
      </LegalSection>

      <LegalSection title="Order Tracking">
        <p>
          Tracking details are included in your order confirmation email once your order ships.
          In-site order tracking is not yet available — see our{" "}
          <Link href="/customer-service#track-order" className="underline hover:text-flare">Track Order</Link> page
          for the current state of that feature.
        </p>
      </LegalSection>

      <LegalSection title="Lost or Damaged in Transit">
        <p>
          If your order arrives damaged or doesn&rsquo;t arrive within a reasonable time past the
          estimated window, contact us with your order number and we&rsquo;ll investigate with the
          carrier and arrange a replacement or refund.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Shipping questions: <a href="mailto:hello@trenzhome.com" className="underline hover:text-flare">hello@trenzhome.com</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
