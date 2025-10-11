/**
 * Consent Management System
 * Handles cookie consent with groups (Essential, Analytics, Marketing)
 * Stores consent history for GDPR compliance
 */

export type ConsentGroup = "essential" | "analytics" | "marketing";

export interface ConsentPreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export interface ConsentHistoryEntry {
  preferences: ConsentPreferences;
  timestamp: string;
  ip?: string; // Optional, to be added by backend
}

const CONSENT_KEY = "evs-cookie-consent";
const CONSENT_HISTORY_KEY = "evs-consent-history";

/**
 * Get current consent preferences
 */
export function getConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;

    return JSON.parse(stored) as ConsentPreferences;
  } catch (error) {
    console.error("Failed to parse consent preferences:", error);
    return null;
  }
}

/**
 * Save consent preferences
 */
export function saveConsentPreferences(
  preferences: Omit<ConsentPreferences, "timestamp">
): void {
  if (typeof window === "undefined") return;

  const fullPreferences: ConsentPreferences = {
    ...preferences,
    essential: true, // Essential always enabled
    timestamp: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(fullPreferences));
    addToConsentHistory(fullPreferences);
  } catch (error) {
    console.error("Failed to save consent preferences:", error);
  }
}

/**
 * Add entry to consent history
 */
function addToConsentHistory(preferences: ConsentPreferences): void {
  if (typeof window === "undefined") return;

  try {
    const history = getConsentHistory();
    const entry: ConsentHistoryEntry = {
      preferences,
      timestamp: new Date().toISOString(),
    };

    history.push(entry);

    // Keep only last 50 entries
    if (history.length > 50) {
      history.shift();
    }

    localStorage.setItem(CONSENT_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to add to consent history:", error);
  }
}

/**
 * Get consent history
 */
export function getConsentHistory(): ConsentHistoryEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CONSENT_HISTORY_KEY);
    if (!stored) return [];

    return JSON.parse(stored) as ConsentHistoryEntry[];
  } catch (error) {
    console.error("Failed to parse consent history:", error);
    return [];
  }
}

/**
 * Check if a specific consent group is enabled
 */
export function hasConsent(group: ConsentGroup): boolean {
  if (group === "essential") return true; // Essential always enabled

  const preferences = getConsentPreferences();
  if (!preferences) return false;

  return preferences[group] === true;
}

/**
 * Accept all consent groups
 */
export function acceptAll(): void {
  saveConsentPreferences({
    essential: true,
    analytics: true,
    marketing: true,
  });
}

/**
 * Decline all non-essential consent groups
 */
export function declineAll(): void {
  saveConsentPreferences({
    essential: true,
    analytics: false,
    marketing: false,
  });
}

/**
 * Clear all consent data
 */
export function clearConsent(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(CONSENT_HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear consent data:", error);
  }
}

/**
 * Export consent data for GDPR compliance
 */
export function exportConsentData(): {
  preferences: ConsentPreferences | null;
  history: ConsentHistoryEntry[];
} {
  return {
    preferences: getConsentPreferences(),
    history: getConsentHistory(),
  };
}
