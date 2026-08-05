import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="August 5, 2026">
      <LegalSection title="What This Covers">
        <p>
          This policy describes what happens to your information when you use trenzhome.com — what
          we collect, what we don&rsquo;t, and who else sees it. It reflects what the site actually
          does today, not a generic template.
        </p>
      </LegalSection>

      <LegalSection title="What We Collect">
        <p>
          <strong>At checkout:</strong> we use Stripe Checkout for payment. When you check out, Stripe
          collects your name, email, shipping address, and payment details directly — this
          information passes through Stripe&rsquo;s hosted checkout page and doesn&rsquo;t touch our
          servers directly. We receive your order details (items purchased, shipping address, email)
          from Stripe to fulfil your order.
        </p>
        <p>
          <strong>On your device:</strong> your wishlist and recently-viewed products are stored using
          your browser&rsquo;s local storage, not our servers. This data stays on your device and
          isn&rsquo;t transmitted to us or anyone else. Clearing your browser data clears it.
        </p>
        <p>
          <strong>Forms on this site</strong> (Contact, account notify-me, careers notify-me, trade
          application) are not yet connected to backend storage. What you type into them is used only
          to show you a confirmation message in your browser — it isn&rsquo;t currently saved or sent
          anywhere. We&rsquo;ll update this policy when that changes.
        </p>
        <p>
          <strong>We do not currently use</strong> analytics scripts, advertising pixels, or tracking
          cookies of any kind. See our{" "}
          <Link href="/cookie-policy" className="underline hover:text-flare">Cookie Policy</Link> for
          detail.
        </p>
      </LegalSection>

      <LegalSection title="How Payment Information Is Handled">
        <p>
          We never see or store your full card number. Stripe is PCI-DSS compliant and handles all
          payment data directly; our systems only ever see a payment confirmation and order total.
        </p>
      </LegalSection>

      <LegalSection title="Who We Share Data With">
        <p>
          Stripe, to process payment and collect shipping details for order fulfilment. We don&rsquo;t
          sell, rent, or share your information with advertisers or data brokers.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights (GDPR)">
        <p>
          If you&rsquo;re located in the European Economic Area, you have the right to request access
          to, correction of, or deletion of personal data we hold about you, and to object to or
          restrict how it&rsquo;s processed. Given the current scope of what we collect (order data
          held by Stripe, and device-local wishlist data we never receive), most requests will point
          back to Stripe&rsquo;s own privacy controls or simply require clearing your browser storage.
          Contact us at the address below for anything else.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights (CCPA)">
        <p>
          If you&rsquo;re a California resident, you have the right to know what personal information
          we collect, to request its deletion, and to opt out of its sale. We do not sell personal
          information. See &ldquo;What We Collect&rdquo; above for the full scope of what exists.
        </p>
      </LegalSection>

      <LegalSection title="Data Retention">
        <p>
          Order and payment data is retained by Stripe per their own retention policy. We don&rsquo;t
          currently operate a database that stores customer accounts or order history on our end — see
          our <Link href="/account" className="underline hover:text-flare">Account</Link> page for
          where that stands.
        </p>
      </LegalSection>

      <LegalSection title="Children's Privacy">
        <p>This site is not directed at children under 16, and we don&rsquo;t knowingly collect data from them.</p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>We&rsquo;ll update the date at the top of this page when this policy changes, particularly as account features and order history come online.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about this policy: <a href="mailto:hello@trenzhome.com" className="underline hover:text-flare">hello@trenzhome.com</a>, or via our{" "}
          <Link href="/contact" className="underline hover:text-flare">Contact page</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
