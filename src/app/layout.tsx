import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsentProvider } from "@/components/cookie-consent";

import "./globals.css";

const fraunces = { variable: "" };

const publicSans = { variable: "" };

export const metadata: Metadata = {
  title: {
    default: "MadeRidge Website Design | Modern Web Agency",
    template: "%s | MadeRidge Website Design",
  },
  description:
    "MadeRidge designs high-impact, performant websites for modern businesses.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to main content
        </a>
        <CookieConsentProvider>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
