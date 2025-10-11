"use client";

import { useState, useEffect } from "react";
import {
  getConsentPreferences,
  saveConsentPreferences,
  acceptAll,
  declineAll,
  type ConsentPreferences,
} from "@/lib/consent";

/**
 * Enhanced Consent Manager Component
 * Full DSGVO-compliant cookie consent with groups
 * - Essential (always enabled)
 * - Analytics (tracking with consent)
 * - Marketing (third-party marketing)
 */
export default function ConsentManager() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<
    Omit<ConsentPreferences, "timestamp">
  >({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent was already given
    const existing = getConsentPreferences();
    if (!existing) {
      setShowBanner(true);
    } else {
      setPreferences({
        essential: existing.essential,
        analytics: existing.analytics,
        marketing: existing.marketing,
      });
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAll();
    setShowBanner(false);
  };

  const handleDeclineAll = () => {
    declineAll();
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    saveConsentPreferences(preferences);
    setShowBanner(false);
  };

  const handleToggle = (group: keyof typeof preferences) => {
    if (group === "essential") return; // Cannot disable essential
    setPreferences((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-foreground/10 shadow-lg">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {!showDetails ? (
          // Simple Banner
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">
                🍪 Cookie-Einstellungen
              </h3>
              <p className="text-sm text-foreground/80">
                Wir verwenden Cookies, um deine Erfahrung zu verbessern. Du
                kannst wählen, welche Cookie-Kategorien du akzeptieren möchtest.{" "}
                <a
                  href="/recht/datenschutz"
                  className="underline hover:text-primary"
                >
                  Datenschutzerklärung
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm border border-foreground/20 rounded hover:bg-foreground/5 transition-colors"
              >
                Einstellungen
              </button>
              <button
                onClick={handleDeclineAll}
                className="px-4 py-2 text-sm border border-foreground/20 rounded hover:bg-foreground/5 transition-colors"
              >
                Ablehnen
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        ) : (
          // Detailed Settings
          <div>
            <h3 className="font-semibold mb-4">Cookie-Einstellungen</h3>
            <div className="space-y-4 mb-6">
              {/* Essential Cookies */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Erforderlich</h4>
                  <p className="text-sm text-foreground/70">
                    Notwendig für die Funktion der Website. Können nicht
                    deaktiviert werden.
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5"
                  />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Analyse</h4>
                  <p className="text-sm text-foreground/70">
                    Helfen uns zu verstehen, wie Besucher mit der Website
                    interagieren. Alle Daten werden anonymisiert.
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handleToggle("analytics")}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Marketing</h4>
                  <p className="text-sm text-foreground/70">
                    Werden verwendet, um Werbung relevanter zu gestalten. Können
                    Drittanbieter-Cookies enthalten.
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handleToggle("marketing")}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 text-sm border border-foreground/20 rounded hover:bg-foreground/5 transition-colors"
              >
                Zurück
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
              >
                Einstellungen speichern
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
