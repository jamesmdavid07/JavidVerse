"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_COOKIE = "jv_consent";

function applyConsent(consent: "granted" | "denied") {
  document.cookie = `${CONSENT_COOKIE}=${consent}; max-age=31536000; path=/; SameSite=Lax`;
  window.gtag?.("consent", "update", {
    ad_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
    analytics_storage: consent,
  });
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasChoice = document.cookie
      .split(";")
      .some((entry) => entry.trim().startsWith(`${CONSENT_COOKIE}=`));
    if (!hasChoice) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Cookie preferences" className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-xl rounded-2xl border border-primary/15 bg-white p-5 shadow-premium sm:p-6">
        <p className="text-sm leading-6 text-primary">
          We use cookies to understand how visitors use JavidVerse and, with your permission, to
          personalise advertising. Choose whether to allow analytics and personalisation cookies.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              applyConsent("granted");
              setVisible(false);
            }}
            className="btn-primary"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => {
              applyConsent("denied");
              setVisible(false);
            }}
            className="btn-secondary"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
