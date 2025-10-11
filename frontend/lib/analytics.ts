/**
 * Analytics Layer with GDPR Consent Awareness
 * Tracks events only when user has given consent
 */

import { hasConsent } from "./consent";

/**
 * Check if analytics tracking is allowed
 */
export function isTrackingAllowed(): boolean {
  return hasConsent("analytics");
}

/**
 * Log event locally (anonymized)
 * This can be extended to send to core-api in the future
 */
export function logEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  // Only track if consent given
  if (!isTrackingAllowed()) {
    return;
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, properties);
  }

  // In production, this would send to core-api
  // For now, we just store locally for demonstration
  try {
    const events = JSON.parse(
      localStorage.getItem("evs-analytics-events") || "[]"
    ) as Array<{
      event: string;
      properties?: Record<string, unknown>;
      timestamp: string;
    }>;

    events.push({
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
    });

    // Keep only last 100 events
    if (events.length > 100) {
      events.shift();
    }

    localStorage.setItem("evs-analytics-events", JSON.stringify(events));
  } catch (error) {
    // Silently fail if localStorage is not available
    console.error("Failed to log analytics event:", error);
  }
}

/**
 * Track page view
 */
export function trackPageView(path: string) {
  logEvent("page_view", { path });
}

/**
 * Track button click
 */
export function trackClick(elementName: string) {
  logEvent("click", { element: elementName });
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, success: boolean) {
  logEvent("form_submit", { form: formName, success });
}

/**
 * Track download
 */
export function trackDownload(fileName: string) {
  logEvent("download", { file: fileName });
}

/**
 * Clear all analytics data
 */
export function clearAnalyticsData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("evs-analytics-events");
}
