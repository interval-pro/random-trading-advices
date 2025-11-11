// Google Analytics 4 Utility
// Handles GA initialization and tracking with cookie consent support

const GA_MEASUREMENT_ID = 'G-BK7Y78PS78';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Check if user has accepted cookie consent
 */
export const hasCookieConsent = (): boolean => {
  return localStorage.getItem('cookieConsent') === 'accepted';
};

/**
 * Initialize Google Analytics
 * Should only be called when user has accepted cookie consent
 */
export const initializeGA = (): void => {
  if (!hasCookieConsent()) {
    console.warn('GA: Cannot initialize without cookie consent');
    return;
  }

  // Check if gtag is available
  if (typeof window.gtag === 'undefined') {
    console.warn('GA: gtag is not available. Make sure the GA script is loaded in index.html');
    return;
  }

  // Initialize GA with the measurement ID
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  console.log('GA: Initialized successfully');
};

/**
 * Track a page view
 * Only tracks if cookie consent is accepted
 */
export const trackPageView = (path: string): void => {
  if (!hasCookieConsent()) {
    return;
  }

  if (typeof window.gtag === 'undefined') {
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

/**
 * Track a custom event
 * Only tracks if cookie consent is accepted
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
): void => {
  if (!hasCookieConsent()) {
    return;
  }

  if (typeof window.gtag === 'undefined') {
    return;
  }

  window.gtag('event', eventName, eventParams);
};

/**
 * Disable Google Analytics tracking
 * Used when user declines cookies or revokes consent
 */
export const disableGA = (): void => {
  if (typeof window.gtag === 'undefined') {
    return;
  }

  // Set consent mode to denied
  window.gtag('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
  });
};

/**
 * Check if GA should be initialized on page load
 * This is called when the app loads to check if consent was already given
 */
export const checkAndInitializeGA = (): void => {
  if (hasCookieConsent()) {
    initializeGA();
  }
};

