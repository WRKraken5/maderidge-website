import type { Metadata } from "next";

import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = { title: "Privacy Policy" };

const TOC = [
  { href: "#collect", label: "Information we collect" },
  { href: "#use", label: "How we use it" },
  { href: "#share", label: "Whether we sell or share it" },
  { href: "#retain", label: "How long we keep it" },
  { href: "#rights", label: "Your rights and choices" },
  { href: "#children", label: "Children's privacy" },
  { href: "#security", label: "Security" },
  { href: "#contact", label: "Contact us" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      effectiveDate="Effective date: [date]. This is a structural template. Have a licensed attorney review the final language before publishing."
      toc={TOC}
    >
      <div id="collect">
        <h2>1. Information we collect</h2>
        <p>
          When you submit the contact form, we collect the name, email
          address, and message you provide, and, if you choose to provide it,
          a phone number. We do not require account creation to contact us.
          If you use privacy-focused analytics on this site, we also collect
          aggregated, non-identifying traffic data as described in our{" "}
          <a href="/cookies">Cookie Policy</a>.
        </p>
      </div>

      <div id="use">
        <h2>2. How we use it</h2>
        <p>
          We use the information you submit to respond to your inquiry and,
          only if you opt in separately, to send occasional studio updates.
          We do not use your contact information for any purpose beyond what
          you consented to.
        </p>
      </div>

      <div id="share">
        <h2>3. Whether we sell or share it</h2>
        <p>
          We do not sell your personal information. We share it only with
          the service providers necessary to operate this site (our email
          delivery provider and our hosting provider), each bound to use it
          only to provide that service to us.
        </p>
      </div>

      <div id="retain">
        <h2>4. How long we keep it</h2>
        <p>
          We retain contact form submissions for [retention period, e.g., 24
          months] after your last contact with us, after which they are
          deleted, unless a longer period is required to comply with a legal
          obligation.
        </p>
      </div>

      <div id="rights">
        <h2>5. Your rights and choices</h2>
        <p>
          Depending on your state of residence, you may have the right to
          access, correct, or delete the personal information we hold about
          you, and to opt out of any future marketing communications. To
          exercise these rights, email us at the address below.
        </p>
      </div>

      <div id="children">
        <h2>6. Children&rsquo;s privacy</h2>
        <p>
          This site is not directed to children and we do not knowingly
          collect personal information from anyone under 13 (or under 16
          where applicable state law sets that threshold).
        </p>
      </div>

      <div id="security">
        <h2>7. Security</h2>
        <p>
          We use industry-standard technical and organizational measures to
          protect the information you provide, including encrypted
          transmission (HTTPS) and access controls on any systems that store
          it.
        </p>
      </div>

      <div id="contact">
        <h2>8. Contact us</h2>
        <p>
          MadeRidge Website Design
          <br />
          Email:{" "}
          <a href="mailto:privacy@maderidgewebsitedesign.com">
            privacy@maderidgewebsitedesign.com
          </a>
        </p>
      </div>
    </LegalLayout>
  );
}
