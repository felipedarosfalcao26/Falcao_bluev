export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export type AnalyticsEvent =
  | 'whatsapp_click'
  | 'quote_request'
  | 'charger_search'
  | 'charger_view'
  | 'vehicle_view'
  | 'vehicle_interest_click'
  | 'vehicle_listing_created'
  | 'lead_created';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
  if (window.gtag) {
    window.gtag('event', event, params);
  }
  if (window.fbq) {
    window.fbq('trackCustom', event, params);
  }
}
