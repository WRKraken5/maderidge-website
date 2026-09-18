import type { Metadata } from "next";

import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = { title: "Terms of Service" };

const TOC = [
  { href: "#acceptance", label: "Acceptance of terms" },
  { href: "#services", label: "Description of services" },
  { href: "#engagement", label: "Client engagements" },
  { href: "#use", label: "Acceptable use of this website" },
  { href: "#ip", label: "Intellectual property" },
  { href: "#liability", label: "Disclaimers and limitation of liability" },
  { href: "#law", label: "Governing law" },
  { href: "#changes", label: "Changes to these terms" },
  { href: "#contact", label: "Contact us" },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      effectiveDate="Effective date: [date]. This is a structural template. Have a licensed attorney review the final language before publishing."
      toc={TOC}
    >
      <div id="acceptance">
        <h2>1. Acceptance of terms</h2>
        <p>
          By using this website, you agree to these Terms of Service. If you
          do not agree, please do not use this site.
        </p>
      </div>

      <div id="services">
        <h2>2. Description of services</h2>
        <p>
          MadeRidge Website Design (&ldquo;MadeRidge,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us&rdquo;) designs and builds custom websites for businesses.
          Information on this site is provided for general reference and does
          not itself constitute a service agreement.
        </p>
      </div>

      <div id="engagement">
        <h2>3. Client engagements</h2>
        <p>
          Paid design and development work is governed by a separate, signed
          contract or statement of work agreed to directly with each client.
          That contract, not this page, controls project scope, payment
          terms, timelines, and deliverable ownership for any specific
          engagement.
        </p>
      </div>

      <div id="use">
        <h2>4. Acceptable use of this website</h2>
        <p>
          You agree not to misuse this site, including by attempting to gain
          unauthorized access to any system, interfering with normal
          operation, or submitting the contact form for any purpose other
          than a genuine inquiry.
        </p>
      </div>

      <div id="ip">
        <h2>5. Intellectual property</h2>
        <p>
          The content, design, and code of this website (excluding client
          deliverables, which are governed by their individual contracts)
          belong to MadeRidge Website Design and may not be copied or reused
          without permission.
        </p>
      </div>

      <div id="liability">
        <h2>6. Disclaimers and limitation of liability</h2>
        <p>
          This website and its content are provided &ldquo;as is&rdquo;
          without warranties of any kind. To the fullest extent permitted by
          law, MadeRidge is not liable for indirect, incidental, or
          consequential damages arising from your use of this site.
        </p>
      </div>

      <div id="law">
        <h2>7. Governing law</h2>
        <p>
          These terms are governed by the laws of [State], without regard to
          conflict-of-law principles, and any dispute will be resolved in the
          courts located in [County, State].
        </p>
      </div>

      <div id="changes">
        <h2>8. Changes to these terms</h2>
        <p>
          We may update these terms from time to time. The effective date
          above reflects the most recent revision.
        </p>
      </div>

      <div id="contact">
        <h2>9. Contact us</h2>
        <p>
          MadeRidge Website Design
          <br />
          Email:{" "}
          <a href="mailto:hello@maderidgewebsitedesign.com">
            hello@maderidgewebsitedesign.com
          </a>
        </p>
      </div>
    </LegalLayout>
  );
}
