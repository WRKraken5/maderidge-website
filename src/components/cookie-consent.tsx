"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

type Consent = "accepted" | "declined" | null;

const STORAGE_KEY = "maderidge-cookie-consent";

type CookieConsentContextValue = {
  openPreferences: () => void;
};

const CookieConsentContext = React.createContext<CookieConsentContextValue | null>(
  null,
);

export function useCookieConsent() {
  const ctx = React.useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

function getStoredConsent(): Consent {
  try {
    return window.localStorage.getItem(STORAGE_KEY) as Consent;
  } catch {
    // private browsing / storage blocked: treat as no stored choice
    return null;
  }
}

function setStoredConsent(value: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // storage unavailable; the choice will simply be asked again next visit
  }
}

function loadNonEssentialScripts() {
  // Example only. If/when a cookie-setting analytics tool is added, load it
  // here, after consent, not unconditionally in the page head. Left empty
  // by default because the recommended setup is cookieless analytics, which
  // does not need to be gated behind consent.
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // localStorage doesn't exist during SSR, so this state can only be
    // determined after mount -- that's the whole point of this effect, not
    // something an effect-free alternative could replace.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    } else if (stored === "accepted") {
      loadNonEssentialScripts();
    }
  }, []);

  const accept = React.useCallback(() => {
    setStoredConsent("accepted");
    setVisible(false);
    loadNonEssentialScripts();
  }, []);

  const decline = React.useCallback(() => {
    setStoredConsent("declined");
    setVisible(false);
  }, []);

  const openPreferences = React.useCallback(() => {
    setVisible(true);
  }, []);

  return (
    <CookieConsentContext.Provider value={{ openPreferences }}>
      {children}
      {mounted && visible ? (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-primary bg-foreground text-background"
        >
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <p className="max-w-xl text-sm">
              We use a small amount of privacy-focused, cookieless analytics to
              understand site traffic. Read our{" "}
              <a href="/cookies" className="text-primary underline">
                Cookie Policy
              </a>{" "}
              for details.
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="border-background text-background hover:bg-background/10"
                onClick={decline}
              >
                Decline
              </Button>
              <Button type="button" size="sm" onClick={accept}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </CookieConsentContext.Provider>
  );
}
