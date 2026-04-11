/**
 * Analytics utility — PostHog (product analytics) + GA4 (acquisition/SEO) + Meta Pixel
 *
 * Usage:
 *   import { track, identify, page } from '../utils/analytics';
 *   track('signup_completed', { method: 'email' });
 *
 * Environment variables (set in .env.local):
 *   VITE_POSTHOG_KEY   — PostHog project API key
 *   VITE_POSTHOG_HOST  — PostHog host (defaults to https://app.posthog.com)
 *   VITE_GA4_ID        — GA4 Measurement ID (G-XXXXXXXX)
 *
 * Meta Pixel is loaded via index.html. Replace META_PIXEL_ID in index.html
 * with the pixel ID from Meta Events Manager before going live.
 */

// ─── PostHog ────────────────────────────────────────────────────────────────

let posthog = null;

export function initPostHog() {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  if (!key) return;

  import('posthog-js').then(({ default: ph }) => {
    ph.init(key, {
      api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
      capture_pageview: false, // we fire pageviews manually via page()
      persistence: 'localStorage',
      autocapture: true,
    });
    posthog = ph;
  });
}

// ─── GA4 helper ─────────────────────────────────────────────────────────────

function gtag(...args) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag(...args);
}

// ─── Meta Pixel helper ───────────────────────────────────────────────────────

function fbq(...args) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq(...args);
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Track a custom event in both PostHog and GA4.
 * @param {string} name  snake_case event name
 * @param {object} props optional properties
 */
export function track(name, props = {}) {
  posthog?.capture(name, props);
  gtag('event', name, props);
}

/**
 * Identify the current user after login/register.
 * @param {string} userId
 * @param {object} traits  name, email, etc.
 */
export function identify(userId, traits = {}) {
  posthog?.identify(userId, traits);
  gtag('set', 'user_properties', traits);
}

/**
 * Record a page view. Call on every route change.
 * @param {string} path  e.g. '/dashboard'
 * @param {string} title page title
 */
export function page(path, title) {
  posthog?.capture('$pageview', { $current_url: window.location.href });
  gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
  });
  fbq('track', 'PageView');
}

/**
 * Reset identity on logout.
 */
export function reset() {
  posthog?.reset();
}

// ─── Named conversion events ─────────────────────────────────────────────────

export const Events = {
  // Acquisition
  LANDING_EMAIL_CAPTURE: 'landing_email_capture',

  // Auth funnel
  SIGNUP_STARTED:       'signup_started',
  SIGNUP_COMPLETED:     'signup_completed',
  LOGIN_COMPLETED:      'login_completed',

  // Onboarding funnel
  ONBOARDING_STEP:      'onboarding_step_completed',
  ONBOARDING_COMPLETE:  'onboarding_completed',

  // Product
  JOURNEY_CREATED:      'journey_created',
  SESSION_PLAYED:       'session_played',
};

// ─── Meta Pixel conversion events ────────────────────────────────────────────
// Called explicitly at key conversion points alongside track().

/**
 * Fire Meta Pixel Lead event — email capture on landing page.
 */
export function pixelLead() {
  fbq('track', 'Lead');
}

/**
 * Fire Meta Pixel CompleteRegistration event — after successful signup.
 */
export function pixelCompleteRegistration() {
  fbq('track', 'CompleteRegistration');
}

/**
 * Fire Meta Pixel InitiateCheckout event — when user begins a paid flow.
 * @param {number} value   amount in USD
 * @param {string} currency defaults to 'USD'
 */
export function pixelInitiateCheckout(value, currency = 'USD') {
  fbq('track', 'InitiateCheckout', { value, currency });
}

/**
 * Fire Meta Pixel Purchase event — after a successful payment.
 * @param {number} value   amount in USD
 * @param {string} currency defaults to 'USD'
 */
export function pixelPurchase(value, currency = 'USD') {
  fbq('track', 'Purchase', { value, currency });
}
