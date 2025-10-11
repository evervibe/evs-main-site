"use client";

import { useState, useEffect } from "react";
import { getCurrentLocale, setCurrentLocale, locales, type Locale } from "@/lib/i18n";

/**
 * Language Switcher Component
 * Allows users to switch between German and English
 */
export default function LanguageSwitcher() {
  const [currentLocale, setLocale] = useState<Locale>("de");

  useEffect(() => {
    setLocale(getCurrentLocale());
  }, []);

  const handleLocaleChange = (locale: Locale) => {
    setCurrentLocale(locale);
    setLocale(locale);

    // In a full implementation, this would:
    // 1. Update the URL with the new locale prefix
    // 2. Reload the page with localized content
    // For now, just store in localStorage and show alert
    
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          className={`px-2 py-1 rounded transition-colors ${
            currentLocale === locale
              ? "bg-primary text-primary-foreground"
              : "hover:bg-foreground/5"
          }`}
          aria-label={`Switch to ${locale.toUpperCase()}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
