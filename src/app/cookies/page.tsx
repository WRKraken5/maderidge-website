import type { Metadata } from "next";

import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = { title: "Cookie Policy" };

const TOC = [
  { href: "#what", label: "What we use" },
  { href: "#purpose", label: "Why we use it" },
  { href: "#control", label: "How to control or withdraw consent" },
  { href: "#duration", label: "How long it persists" },
  { href: "#browser", label: "Managing cookies in your browser" },
  { href: "#contact", label: "Contact us" },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      effectiveDate="Effective date: [date]. This is a structural template. Have a licensed attorney review the final language before publishing."
      toc={TOC}
    >
      <div id="what">
        <h2>1. What we use</h2>
        <p>
          This site&rsquo;s default configuration uses privacy-focused,
          cookieless analytics to understand overall traffic, which does not
          set tracking cookies or identify you individually. If we ever add a
          cookie-based tool, such as Google Analytics, this page will be
          updated to list it specifically before that tool is enabled, and
          the cookie consent banner on this site will gate its loading
          behind your consent.
        </p>
      </div>

      <div id="purpose">
        <h2>2. Why we use it</h2>
        <p>
          Any analytics we run exist to understand which pages are useful to
          visitors and where the site can be improved. We do not use cookies
          for advertising or cross-site tracking.
        </p>
      </div>

      <div id="control">
        <h2>3. How to control or withdraw consent</h2>
        <p>
          If a consent banner is shown to you, you can accept or decline
          non-essential cookies at any time, and you can change your choice
          later using the &ldquo;Cookie preferences&rdquo; link in the site
          footer.
        </p>
      </div>

      <div id="duration">
        <h2>4. How long it persists</h2>
        <p>
          Your consent choice, if you make one, is stored in your browser
          only and does not expire automatically. Clearing your
          browser&rsquo;s site data will reset it, and you will be asked
          again on your next visit.
        </p>
      </div>

      <div id="browser">
        <h2>5. Managing cookies in your browser</h2>
        <p>
          Most browsers let you block or delete cookies through their
          settings. Doing so may affect how some websites, including parts
          of this one, function.
        </p>
      </div>

      <div id="contact">
        <h2>6. Contact us</h2>
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
