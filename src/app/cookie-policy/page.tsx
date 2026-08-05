import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection } from "@/components/legal/legal-layout";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="August 5, 2026">
      <LegalSection title="Short Version">
        <p>
          This site does not currently set tracking, advertising, or analytics cookies. We use your
          browser&rsquo;s local storage — a similar but distinct technology — for a couple of specific,
          non-tracking purposes described below.
        </p>
      </LegalSection>

      <LegalSection title="What We Actually Use: Local Storage">
        <p>
          <strong>Wishlist</strong> — when you save a product, its identifier is stored in your
          browser&rsquo;s local storage so your wishlist persists between visits on that device.
        </p>
        <p>
          <strong>Recently viewed</strong> — the products you&rsquo;ve looked at recently are stored
          the same way, so we can show you a &ldquo;recently viewed&rdquo; section.
        </p>
        <p>
          Neither of these is transmitted to our servers or any third party — they live entirely in
          your browser, are specific to the device and browser you&rsquo;re using, and are cleared if
          you clear your browsing data.
        </p>
      </LegalSection>

      <LegalSection title="Payment Processing">
        <p>
          When you check out, you&rsquo;re redirected to a Stripe-hosted checkout page. Stripe may set
          its own cookies on that page as part of processing your payment securely and preventing
          fraud — this is governed by{" "}
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-flare">
            Stripe&rsquo;s own privacy policy
          </a>, not this one.
        </p>
      </LegalSection>

      <LegalSection title="No Advertising or Analytics Cookies — Yet">
        <p>
          We don&rsquo;t currently run analytics (like Google Analytics) or advertising pixels (like
          Meta Pixel) on this site. If that changes, we&rsquo;ll update this policy and add a consent
          mechanism before any such cookies are set.
        </p>
      </LegalSection>

      <LegalSection title="Managing Local Storage">
        <p>
          You can clear local storage at any time through your browser&rsquo;s settings (usually under
          Privacy or Site Data) — this will clear your saved wishlist and recently-viewed history on
          that device.
        </p>
      </LegalSection>

      <LegalSection title="Related">
        <p>
          See our <Link href="/privacy" className="underline hover:text-flare">Privacy Policy</Link> for
          the fuller picture of what data exists and where.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
