# MadeRidge Website Design — Starter Scaffold

This is a working starting point, not the finished site. It pairs with `MadeRidge_Website_Blueprint.md`, which explains every decision made here.

## What is built out

- `index.html`, `contact.html`, `404.html` — fully implemented pages demonstrating the design system, the consent-based contact form, and the required 404 structure.
- `legal/privacy.html` — a complete structural template for the four required legal pages. Copy this file to `legal/terms.html`, `legal/cookies.html`, and `legal/refunds.html`, and replace the body content using the outlines in Blueprint section 6.5. All four still need attorney review before publishing.
- `css/styles.css` — the full design system: color tokens, type scale, components. Every rule here maps to a constraint in the Blueprint's Section 2 and Section 7 (accessibility).
- `js/main.js` — contact form client-side UX and validation (not the security boundary; see `server/contact-handler.js`).
- `js/cookie-consent.js` — the consent banner pattern, currently a no-op loader since the recommended setup (cookieless analytics) does not require it. Wire in your analytics script inside `loadNonEssentialScripts()` if that changes.
- `server/security-headers.js`, `server/contact-handler.js` — Node/Express reference implementations of the security checklist in Blueprint Section 7. Adapt to your actual hosting/runtime (a serverless function on Netlify/Vercel follows the same logic in a different file shape).
- `.env.example`, `.gitignore`, `image-licenses.csv` — operational hygiene files. Copy `.env.example` to `.env` and never commit the real one.

## Still to build

`about.html`, `services.html`, `work.html`, and `legal/terms.html`, `legal/cookies.html`, `legal/refunds.html` — use the existing pages as the structural template (same header/footer, same `css/styles.css` classes) and Blueprint Sections 3 and 6.5 for content.

## Before launch

Run the full pre-deployment checklist in Blueprint Section 7.6.
