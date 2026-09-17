// MadeRidge Website Design -- cookie consent banner.
//
// This site's recommended default (see Blueprint section 5.3) is cookieless,
// privacy-first analytics, which does not legally require this banner at all.
// This file is included so the pattern is ready the moment GA4 or any other
// cookie-setting tool is added to this site or to a client's site: the banner
// gates loading of that script until the visitor consents.
//
// It also exposes window.MadeRidgeConsent so other scripts (the quote quiz,
// the contact form) can read the current choice and react when it changes,
// without each of them re-implementing storage access.

const CONSENT_KEY = "maderidge-cookie-consent"; // "accepted" | "declined"
const CONSENT_EVENT = "maderidge:consent-change";

function getStoredConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null; // private browsing / storage blocked: treat as no stored choice
  }
}

function setStoredConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // storage unavailable; consent choice will simply be asked again next visit
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { consent: value } }));
}

function openConsentBanner() {
  const banner = document.getElementById("consent-banner");
  if (!banner) return;
  banner.hidden = false;
  banner.querySelector("button")?.focus();
}

function loadNonEssentialScripts() {
  // Example only. If/when a cookie-setting analytics tool is added, load it
  // here, after consent, not in the page <head>. Example for GA4:
  //
  // const script = document.createElement("script");
  // script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
  // script.async = true;
  // document.head.appendChild(script);
  //
  // Left empty by default because the recommended setup uses cookieless
  // analytics, which does not need to be gated behind consent.
}

// Public API used by quote-quiz.js and main.js to gate features on consent.
window.MadeRidgeConsent = {
  STORAGE_KEY: CONSENT_KEY,
  EVENT: CONSENT_EVENT,
  get: getStoredConsent,
  open: openConsentBanner,
};

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("consent-banner");

  document.querySelectorAll("[data-open-cookie-prefs]").forEach((btn) => {
    btn.addEventListener("click", openConsentBanner);
  });

  if (!banner) return;

  const stored = getStoredConsent();

  if (!stored) {
    banner.hidden = false;
  } else if (stored === "accepted") {
    loadNonEssentialScripts();
  }

  document.getElementById("cookie-accept")?.addEventListener("click", () => {
    setStoredConsent("accepted");
    banner.hidden = true;
    loadNonEssentialScripts();
  });

  document.getElementById("cookie-decline")?.addEventListener("click", () => {
    setStoredConsent("declined");
    banner.hidden = true;
  });
});
