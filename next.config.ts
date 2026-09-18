import type { NextConfig } from "next";

// Static CSP (no nonce). This site's pages are all statically generated --
// Next.js only supports per-request nonces on dynamically rendered pages
// (see node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md,
// "Static vs Dynamic Rendering with CSP"), and forcing every page to render
// dynamically just to get a nonce would throw away static generation and CDN
// caching for a small dark marketing site that doesn't need it. This is
// Next's own documented "Without Nonces" recipe from that same guide.
//
// script-src and style-src need 'unsafe-inline' because Next.js's own
// hydration/RSC payload is injected via inline <script>, and a few
// components here (the shadcn-style Progress bar, next/image's `fill`
// layout) set inline style="" attributes. Static hashing (SRI) is an
// experimental alternative Next offers, but it doesn't cover style-src and
// isn't stable enough to depend on yet.
const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self' https://formspree.io;
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';
  base-uri 'self';
  object-src 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
