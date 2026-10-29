/**
 * Google Analytics (GA4) lead tracking.
 *
 * The gtag snippet in each page's <head> defines window.gtag. Every helper
 * here is a no-op when it is missing (ad blockers, local dev without the tag).
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/** Where on the page a link sits, e.g. "nav", "home", "faq", "footer". */
function linkLocation(link: Element): string {
  if (link.closest('#navDrawer')) return 'mobile_menu';
  if (link.closest('#nav')) return 'nav';
  if (link.closest('footer')) return 'footer';
  return link.closest('section[id]')?.id || 'page';
}

const SOCIAL_PLATFORMS: [RegExp, string][] = [
  [/instagram\.com/i, 'instagram'],
  [/facebook\.com|fb\.com/i, 'facebook'],
  [/pinterest\./i, 'pinterest'],
];

function handleLinkClick(event: MouseEvent): void {
  const target = event.target as Element | null;
  const link = target?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!link) return;

  const href = link.getAttribute('href') ?? '';
  const params = {
    link_location: linkLocation(link),
    link_text: link.textContent?.trim().slice(0, 100),
  };

  if (href.startsWith('tel:')) {
    trackEvent('click_to_call', params);
    return;
  }
  if (href.startsWith('mailto:')) {
    trackEvent('click_email', params);
    return;
  }
  if (/google\.[a-z.]+\/maps/i.test(href)) {
    trackEvent('get_directions', params);
    return;
  }
  const social = SOCIAL_PLATFORMS.find(([pattern]) => pattern.test(href));
  if (social) {
    trackEvent('social_click', { ...params, platform: social[1] });
    return;
  }
  if (href.startsWith('/reserve')) {
    const experience = new URL(href, window.location.origin).searchParams.get('experience');
    trackEvent('click_book_now', { ...params, booking_type: experience ?? 'any' });
  }
}

let listening = false;

/** Track calls, emails, directions, socials and Book Now clicks across the page. */
export function initLeadTracking(): void {
  if (listening || typeof document === 'undefined') return;
  listening = true;
  document.addEventListener('click', handleLinkClick, { capture: true, passive: true });
}
