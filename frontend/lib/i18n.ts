/**
 * Internationalization (i18n) Configuration
 * Supports German (de) and English (en)
 * Default language: German
 */

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

/**
 * Detect user's preferred language from browser
 */
export function detectLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const browserLang = navigator.language.split("-")[0];
  return locales.includes(browserLang as Locale)
    ? (browserLang as Locale)
    : defaultLocale;
}

/**
 * Get current locale from path or storage
 */
export function getCurrentLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  // Check localStorage
  const stored = localStorage.getItem("evs-locale");
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale;
  }

  // Check URL path
  const path = window.location.pathname;
  const urlLocale = path.split("/")[1];
  if (locales.includes(urlLocale as Locale)) {
    return urlLocale as Locale;
  }

  return defaultLocale;
}

/**
 * Set current locale
 */
export function setCurrentLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("evs-locale", locale);
}

/**
 * Get localized path
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove leading slash and any existing locale prefix
  const cleanPath = path.replace(/^\//, "").replace(/^(de|en)\//, "");

  // Add locale prefix unless it's the default
  if (locale === defaultLocale) {
    return `/${cleanPath}`;
  }

  return `/${locale}/${cleanPath}`;
}

/**
 * Static translations (can be extended to fetch from CMS)
 */
export const translations = {
  de: {
    // Navigation
    nav: {
      home: "Home",
      blog: "Blog",
      templates: "Templates",
      about: "Über uns",
      contact: "Kontakt",
      team: "Team",
    },
    // Common
    common: {
      loading: "Lädt...",
      error: "Fehler",
      success: "Erfolgreich",
      readMore: "Weiterlesen",
      learnMore: "Mehr erfahren",
      download: "Herunterladen",
      buy: "Kaufen",
    },
    // SEO
    seo: {
      defaultTitle: "EverVibe Studios",
      defaultDescription:
        "Premium Next.js Templates und individuelle Webentwicklung – DSGVO-ready, modern, schnell.",
    },
    // Newsletter
    newsletter: {
      title: "Newsletter",
      description:
        "Bleibe auf dem Laufenden über neue Templates und Updates. Jederzeit abbestellbar.",
      emailPlaceholder: "deine@email.de",
      namePlaceholder: "Max Mustermann",
      subscribe: "Jetzt anmelden",
      success:
        "Bestätigungsmail gesendet! Bitte überprüfe dein Postfach und klicke auf den Bestätigungslink.",
      error: "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.",
    },
    // Consent
    consent: {
      title: "Cookie-Einstellungen",
      description:
        "Wir verwenden Cookies, um deine Erfahrung zu verbessern. Du kannst wählen, welche Cookie-Kategorien du akzeptieren möchtest.",
      essential: "Erforderlich",
      essentialDesc:
        "Notwendig für die Funktion der Website. Können nicht deaktiviert werden.",
      analytics: "Analyse",
      analyticsDesc:
        "Helfen uns zu verstehen, wie Besucher mit der Website interagieren. Alle Daten werden anonymisiert.",
      marketing: "Marketing",
      marketingDesc:
        "Werden verwendet, um Werbung relevanter zu gestalten. Können Drittanbieter-Cookies enthalten.",
      acceptAll: "Alle akzeptieren",
      declineAll: "Ablehnen",
      save: "Einstellungen speichern",
    },
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      blog: "Blog",
      templates: "Templates",
      about: "About",
      contact: "Contact",
      team: "Team",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      readMore: "Read more",
      learnMore: "Learn more",
      download: "Download",
      buy: "Buy",
    },
    // SEO
    seo: {
      defaultTitle: "EverVibe Studios",
      defaultDescription:
        "Premium Next.js templates and custom web development – GDPR-ready, modern, fast.",
    },
    // Newsletter
    newsletter: {
      title: "Newsletter",
      description:
        "Stay updated on new templates and updates. Unsubscribe anytime.",
      emailPlaceholder: "your@email.com",
      namePlaceholder: "John Doe",
      subscribe: "Subscribe now",
      success:
        "Confirmation email sent! Please check your inbox and click the confirmation link.",
      error: "An error occurred. Please try again later.",
    },
    // Consent
    consent: {
      title: "Cookie Settings",
      description:
        "We use cookies to improve your experience. You can choose which cookie categories you want to accept.",
      essential: "Essential",
      essentialDesc:
        "Necessary for the website to function. Cannot be disabled.",
      analytics: "Analytics",
      analyticsDesc:
        "Help us understand how visitors interact with the website. All data is anonymized.",
      marketing: "Marketing",
      marketingDesc:
        "Used to make advertising more relevant. May include third-party cookies.",
      acceptAll: "Accept all",
      declineAll: "Decline",
      save: "Save settings",
    },
  },
};

/**
 * Get translation for a key
 */
export function t(
  key: string,
  locale: Locale = defaultLocale
): string {
  const keys = key.split(".");
  let value: unknown = translations[locale];

  for (const k of keys) {
    if (typeof value === "object" && value !== null && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === "string" ? value : key;
}
