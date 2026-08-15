import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = { title: "Security Policy" };

export default function SecurityPolicyPage() {
  return (
    <LegalLayout title="Security Policy" lastUpdated="August 5, 2026">
      <LegalSection title="Payment Security">
        <p>
          We use Shopify Checkout for all payments. Your card details are entered directly into
          Shopify&rsquo;s hosted checkout page and never pass through our servers — this keeps us out
          of direct PCI-DSS scope for cardholder data, because we never handle it. Shopify is
          independently PCI-DSS Level 1 certified.
        </p>
      </LegalSection>

      <LegalSection title="Connection Security">
        <p>
          All traffic to trenzhome.com is served over HTTPS. We don&rsquo;t support unencrypted
          connections.
        </p>
      </LegalSection>

      <LegalSection title="Account Security">
        <p>
          Account sign-in isn&rsquo;t live on this site yet, so there are currently no passwords or
          account credentials for us to store or secure. When accounts launch, we&rsquo;ll update this
          page with the specifics of how credentials are protected.
        </p>
      </LegalSection>

      <LegalSection title="Data We Don't Have">
        <p>
          Because we don&rsquo;t operate customer accounts, order history, or stored payment methods
          today, there&rsquo;s a correspondingly small amount of sensitive data at rest on our systems.
          See our <a href="/privacy" className="underline hover:text-flare">Privacy Policy</a> for
          exactly what does and doesn&rsquo;t exist.
        </p>
      </LegalSection>

      <LegalSection title="Reporting a Security Issue">
        <p>
          If you believe you&rsquo;ve found a security vulnerability affecting this site, please report
          it to <a href="mailto:hello@trenzhome.com" className="underline hover:text-flare">hello@trenzhome.com</a> rather
          than disclosing it publicly. We don&rsquo;t currently operate a formal bug bounty program, but
          we take reports seriously and will respond.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
