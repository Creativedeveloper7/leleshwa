import { isSanityConfigured, sanityClient } from '../sanity/client';
import { SITE_CONTENT_QUERY } from '../sanity/queries';
import { STATIC_SITE_CONTENT } from './fallback';
import { mapSanityPayload } from './mapSanity';
import type { SiteContent } from './types';

let cached: SiteContent | null = null;
let inflight: Promise<SiteContent> | null = null;

async function fetchFromSanity(): Promise<SiteContent> {
  if (!isSanityConfigured) {
    return STATIC_SITE_CONTENT;
  }

  try {
    const payload = await sanityClient.fetch<Record<string, unknown>>(SITE_CONTENT_QUERY);
    return mapSanityPayload(payload ?? {});
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
