import type { Metadata } from "next";

import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = { title: "Refund Policy" };

const TOC = [
  { href: "#deposits", label: "Deposits" },
  { href: "#milestones", label: "Milestone payments" },
  { href: "#completed", label: "Completed work" },
  { href: "#process", label: "How to request a refund" },
  { href: "#cancellation", label: "Project cancellation" },
  { href: "#contact", label: "Contact us" },
];

export default function RefundsPage() {
  return (
    <LegalLayout title="Refund Policy" effectiveDate="Effective date: September 15, 2026" toc={TOC}>
      <div id="deposits">
        <h2>1. Deposits</h2>
        <p>
          Initial project deposits secure your production slot and cover
          discovery, site architecture, and early wireframing. Deposits are
          fully refundable if a project is cancelled in writing prior to the
          project kickoff meeting or before any design work has commenced.
          Once design work or project onboarding has started, the deposit is
          non-refundable.
        </p>
      </div>

      <div id="milestones">
        <h2>2. Milestone payments</h2>
        <p>
          Payments tied to completed and client-approved project milestones
          are non-refundable. If a project is cancelled mid-phase, any
          advanced payments collected for milestones or deliverables where
          work has not yet begun will be refunded on a pro-rata basis, minus
          the cost of hours already logged.
        </p>
      </div>

      <div id="completed">
        <h2>3. Completed work</h2>
        <p>
          Fees for work that has been delivered and approved by the client
          are non-refundable.
        </p>
      </div>

      <div id="process">
        <h2>4. How to request a refund</h2>
        <p>
          To request a refund, email us at the address below with your
          project name and the payment in question. We will respond within 2
          business days.
        </p>
      </div>

      <div id="cancellation">
        <h2>5. Project cancellation</h2>
        <p>
          If a project is cancelled by the client prior to completion, the
          client retains ownership of all finished deliverables that have
          been paid for in full. All unapproved drafts, unused concept
          files, raw design assets, and unpaid custom code remain the
          exclusive intellectual property of MadeRidge.
        </p>
        <p>
          This policy operates alongside, and does not replace, the signed
          contract for your specific project. Where the two conflict, the
          signed contract controls.
        </p>
      </div>

      <div id="contact">
        <h2>6. Contact us</h2>
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
