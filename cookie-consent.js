// MadeRidge Website Design -- cookie consent banner.
//
// This site's recommended default (see the site blueprint) is cookieless,
// privacy-first analytics, which does not legally require this banner at all.
// This file is included so the pattern is ready the moment GA4 or any other
// cookie-setting tool is added: the banner gates loading of that script until
// the visitor consents, and the visitor's choice persists across pages via
// localStorage so they are not asked again on every page load.

const CONSENT_KEY = "cookieConsent"; // "accepted" | "declined"

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("consent-banner");
  const openPrefsBtn = document.getElementById("open-cookie-prefs");
  if (!banner) return;

  const stored = getStoredConsent();

  if (stored === "accepted" || stored === "declined") {
    // A choice was already made on a previous page or visit: keep the
    // banner hidden and, if accepted, load any gated scripts immediately.
    banner.hidden = true;
    if (stored === "accepted") {
      loadNonEssentialScripts();
    }
  } else {
    // No stored choice yet: show the banner.
    banner.hidden = false;
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

  // "Cookie preferences" link in the footer re-opens the banner so a visitor
  // can change their mind after already choosing once.
  openPrefsBtn?.addEventListener("click", () => {
    banner.hidden = false;
    banner.querySelector("button")?.focus();
  });
});

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
