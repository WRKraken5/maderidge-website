"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/components/cookie-consent";

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/refunds", label: "Refund Policy" },
];

export function SiteFooter() {
  const { openPreferences } = useCookieConsent();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 text-sm text-ink-soft">
          <p className="font-semibold text-foreground">MadeRidge Website Design</p>
          <p>
            Email:{" "}
            <a
              href="mailto:hello@maderidgewebsitedesign.com"
              className="underline hover:text-primary"
            >
              hello@maderidgewebsitedesign.com
            </a>
          </p>
        </div>

        <nav aria-label="Legal" className="mb-6">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="underline hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Button type="button" variant="secondary" size="sm" onClick={openPreferences}>
                Cookie preferences
              </Button>
            </li>
          </ul>
        </nav>

        <p className="text-sm text-ink-soft">
          &copy; {new Date().getFullYear()} MadeRidge Website Design. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
