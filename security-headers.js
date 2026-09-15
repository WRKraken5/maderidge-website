// MadeRidge Website Design -- shared security middleware for any Node/Express
// backend the studio runs (currently: only the contact form endpoint).
// Apply this once, globally, rather than re-implementing headers per route.

const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

function applySecurityMiddleware(app) {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
          connectSrc: ["'self'"],
          frameAncestors: ["'none'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          upgradeInsecureRequests: [],
        },
      },
      hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
      frameguard: { action: "deny" },
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      noSniff: true,
    })
  );

  app.use(
    cors({
      origin: [process.env.SITE_ORIGIN], // e.g. "https://maderidgewebsitedesign.com" -- never "*" with credentials
      credentials: true,
      methods: ["GET", "POST"],
    })
  );

  // Tighter limit on the contact endpoint than any general API traffic.
  app.use(
    "/api/contact",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 5,
      standardHeaders: true,
      legacyHeaders: false,
      message: "Too many requests. Please try again later.",
    })
  );

  // Never leak stack traces or debug info in production.
  app.set("env", process.env.NODE_ENV || "production");
}

module.exports = { applySecurityMiddleware };
