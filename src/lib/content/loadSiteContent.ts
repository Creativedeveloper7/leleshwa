import { isSanityConfigured, sanityClient } from '../sanity/client';
import { SITE_CONTENT_QUERY } from '../sanity/queries';
import { STATIC_SITE_CONTENT } from './fallback';
import { mapSanityPayload } from './mapSanity';
import type { SiteContent } from './types';

let cached: SiteContent | null = null;
let inflight: Promise<SiteContent> | null = null;

async function fetchFromSanity(): Promise<SiteContent> {
  if (!isSanityConfigured) {
    console.warn('[content] Sanity is not configured — using static content.');
    return STATIC_SITE_CONTENT;
  }

  try {
    const payload = await sanityClient.fetch<Record<string, unknown>>(SITE_CONTENT_QUERY);
    const mapped = mapSanityPayload(payload ?? {});
    if (mapped.source === 'static') {
      console.warn(
        '[content] Sanity returned no usable documents. Check each document has Name + ID (slug) filled, then publish again.',
      );
    }
    return mapped;
  } catch (error) {
    console.warn('[content] Sanity fetch failed, using static content.', error);
    return STATIC_SITE_CONTENT;
  }
}

export function loadSiteContent(): Promise<SiteContent> {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetchFromSanity().then((content) => {
      cached = content;
      return content;
    });
  }
  return inflight;
}

export function getCachedSiteContent(): SiteContent {
  return cached ?? STATIC_SITE_CONTENT;
}

/** Force the next loadSiteContent() call to refetch from Sanity. */
export function clearSiteContentCache(): void {
  cached = null;
  inflight = null;
}
