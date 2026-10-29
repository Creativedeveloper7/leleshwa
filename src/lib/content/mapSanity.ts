import type { AboutStory } from '../../types/aboutStory';
import type { Accommodation } from '../../types/accommodation';
import type { CuratedEvent } from '../../types/curatedEvent';
import type { CuratedExperience } from '../../types/curatedExperience';
import type { DiningVenue, DiningViewType } from '../../types/diningVenue';
import type { GalleryCategory, GalleryPhoto } from '../../types/galleryPhoto';
import type { SocialLink } from '../../constants/siteSettings';
import type { SiteContent } from './types';
import { STATIC_SITE_CONTENT } from './fallback';

const FALLBACK_HERO = '/images/sunset.webp';

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];
}

/**
 * Serve the lightest image for the page:
 * - Sanity CDN assets get WebP/AVIF auto-format and a sensible max width.
 * - Legacy seeded paths like "/images/main%20house.png" point at the WebP copies.
 */
function optimizeImage(url: string): string {
  if (!url) return url;
  if (url.startsWith('https://cdn.sanity.io/images/')) {
    if (url.includes('?')) return url;
    return `${url}?auto=format&fit=max&w=1600&q=75`;
  }
  const legacy = url.match(/^\/images\/(.+)\.(png|jpe?g)$/i);
  if (legacy && legacy[1] !== 'og-image') {
    const name = decodeURIComponent(legacy[1]).replace(/\s+/g, '-');
    return `/images/${name}.webp`;
  }
  return url;
}

function asImage(value: unknown): string {
  return optimizeImage(asString(value));
}

function asImageArray(value: unknown): string[] {
  return asStringArray(value).map(optimizeImage);
}

function normalizeId(value: unknown): string {
  const raw = asString(value);
  if (!raw) return '';
  // Prefer the slug portion of seeded ids like "accommodation.luxury-suites"
  if (raw.includes('.')) return raw.slice(raw.lastIndexOf('.') + 1) || raw;
  // Also strip public-safe hyphenated document ids like "accommodation-luxury-suites"
  const prefix = /^(accommodation|experience|event|dining|gallery|about)-/;
  return prefix.test(raw) ? raw.replace(prefix, '') : raw;
}

function mapAccommodation(doc: Record<string, unknown>): Accommodation | null {
  const id = normalizeId(doc.id);
  const name = asString(doc.name);
  if (!id || !name) return null;

  return {
    id,
    name,
    tagline: asString(doc.tagline),
    heroImage: asImage(doc.heroImage) || FALLBACK_HERO,
    gallery: asImageArray(doc.gallery),
    description: asString(doc.description),
    amenities: asStringArray(doc.amenities),
    maxGuests: asNumber(doc.maxGuests, 2),
    priceFrom: asNumber(doc.priceFrom),
  };
}

function mapExperience(doc: Record<string, unknown>): CuratedExperience | null {
  const id = normalizeId(doc.id);
  const name = asString(doc.name);
  if (!id || !name) return null;

  return {
    id,
    name,
    tagline: asString(doc.tagline),
    heroImage: asImage(doc.heroImage) || FALLBACK_HERO,
    gallery: asImageArray(doc.gallery),
    description: asString(doc.description),
    highlights: asStringArray(doc.highlights),
    duration: asString(doc.duration),
    maxGuests: asNumber(doc.maxGuests, 2),
    priceFrom: asNumber(doc.priceFrom),
  };
}

function mapEvent(doc: Record<string, unknown>): CuratedEvent | null {
  const base = mapExperience(doc);
  if (!base) return null;
  return {
    ...base,
    priceUnit: asString(doc.priceUnit) || 'per event',
  };
}

function mapDining(doc: Record<string, unknown>): DiningVenue | null {
  const id = normalizeId(doc.id);
  const name = asString(doc.name);
  const viewType = asString(doc.viewType) as DiningViewType;
  if (!id || !name) return null;
  if (viewType !== 'menu' && viewType !== 'form') return null;

  return {
    id,
    name,
    tagline: asString(doc.tagline),
    heroImage: asImage(doc.heroImage) || FALLBACK_HERO,
    viewType,
    ...(viewType === 'menu' ? { menuImages: asImageArray(doc.menuImages) } : {}),
  };
}

const GALLERY_CATEGORIES = new Set<GalleryCategory>([
  'outside-view',
  'restaurant',
  'bar',
  'culinary',
  'events',
  'experiences',
  'accommodations',
]);

function mapGallery(doc: Record<string, unknown>): GalleryPhoto | null {
  const id = normalizeId(doc.id);
  const src = asImage(doc.src);
  const alt = asString(doc.alt);
  const category = asString(doc.category) as GalleryCategory;
  if (!id || !src || !alt || !GALLERY_CATEGORIES.has(category)) return null;
  return { id, src, alt, category };
}

function mapAbout(doc: Record<string, unknown>): AboutStory | null {
  const id = normalizeId(doc.id);
  const name = asString(doc.name);
  if (!id || !name) return null;

  return {
    id,
    name,
    tagline: asString(doc.tagline),
    heroImage: asImage(doc.heroImage) || FALLBACK_HERO,
    gallery: asImageArray(doc.gallery),
    description: asString(doc.description),
    highlights: asStringArray(doc.highlights),
  };
}

function mapSocialLinks(value: unknown): SocialLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const link = item as Record<string, unknown>;
      const id = asString(link.id);
      const label = asString(link.label);
      const href = asString(link.href);
      if (!id || !label || !href) return null;
      return { id, label, href };
    })
    .filter((link): link is SocialLink => link !== null);
}

/**
 * Website copy (in src/constants) is written for search and always wins over
 * the CMS text for items that share an id. Sanity still controls images,
 * prices, capacity and any new items that only exist in the CMS.
 */
function withSiteCopy<T extends { id: string }>(items: T[], copy: T[], fields: (keyof T)[]): T[] {
  const copyById = new Map(copy.map((item) => [item.id, item]));
  return items.map((item) => {
    const source = copyById.get(item.id);
    if (!source) return item;
    const merged = { ...item };
    for (const field of fields) {
      const value = source[field];
      if (Array.isArray(value) ? value.length > 0 : Boolean(value)) merged[field] = value;
    }
    return merged;
  });
}

/** The confirmed Instagram account in src/constants always wins over the CMS link. */
function withOfficialInstagram(links: SocialLink[]): SocialLink[] {
  const official = STATIC_SITE_CONTENT.socialLinks.find((link) => link.id === 'instagram');
  if (!official) return links;
  const isInstagram = (link: SocialLink) =>
    link.id.toLowerCase() === 'instagram' || /instagram\.com/i.test(link.href);
  return links.some(isInstagram)
    ? links.map((link) => (isInstagram(link) ? { ...link, href: official.href } : link))
    : [official, ...links];
}

export function mapSanityPayload(payload: Record<string, unknown>): SiteContent {
  const settings =
    payload.settings && typeof payload.settings === 'object'
      ? (payload.settings as Record<string, unknown>)
      : {};

  const accommodations = Array.isArray(payload.accommodations)
    ? payload.accommodations
        .map((doc) => mapAccommodation(doc as Record<string, unknown>))
        .filter((item): item is Accommodation => item !== null)
        .filter((item) => item.id !== 'family-villas')
    : [];

  const experiences = Array.isArray(payload.experiences)
    ? payload.experiences
        .map((doc) => mapExperience(doc as Record<string, unknown>))
        .filter((item): item is CuratedExperience => item !== null)
    : [];

  const events = Array.isArray(payload.events)
    ? payload.events
        .map((doc) => mapEvent(doc as Record<string, unknown>))
        .filter((item): item is CuratedEvent => item !== null)
    : [];

  const dining = Array.isArray(payload.dining)
    ? payload.dining
        .map((doc) => mapDining(doc as Record<string, unknown>))
        .filter((item): item is DiningVenue => item !== null)
    : [];

  const gallery = Array.isArray(payload.gallery)
    ? payload.gallery
        .map((doc) => mapGallery(doc as Record<string, unknown>))
        .filter((item): item is GalleryPhoto => item !== null)
    : [];

  const about = Array.isArray(payload.about)
    ? payload.about
        .map((doc) => mapAbout(doc as Record<string, unknown>))
        .filter((item): item is AboutStory => item !== null)
    : [];

  const socialLinks = mapSocialLinks(settings.socialLinks);
  const outdoorDiningLocations = asStringArray(settings.outdoorDiningLocations);

  const hasCmsContent =
    accommodations.length > 0 ||
    experiences.length > 0 ||
    events.length > 0 ||
    dining.length > 0 ||
    gallery.length > 0 ||
    about.length > 0 ||
    socialLinks.length > 0;

  if (hasCmsContent && typeof console !== 'undefined') {
    console.info('[content] Loaded Sanity CMS content', {
      accommodations: accommodations.length,
      experiences: experiences.length,
      events: events.length,
      dining: dining.length,
      gallery: gallery.length,
      about: about.length,
    });
  }

  const copy = STATIC_SITE_CONTENT;

  return {
    accommodations:
      accommodations.length > 0
        ? withSiteCopy(accommodations, copy.accommodations, ['tagline', 'description', 'amenities'])
        : copy.accommodations,
    experiences:
      experiences.length > 0
        ? withSiteCopy(experiences, copy.experiences, ['tagline', 'description', 'highlights'])
        : copy.experiences,
    events:
      events.length > 0
        ? withSiteCopy(events, copy.events, ['tagline', 'description', 'highlights'])
        : copy.events,
    dining: dining.length > 0 ? withSiteCopy(dining, copy.dining, ['tagline']) : copy.dining,
    gallery: gallery.length > 0 ? withSiteCopy(gallery, copy.gallery, ['alt']) : copy.gallery,
    about:
      about.length > 0
        ? withSiteCopy(about, copy.about, ['tagline', 'description', 'highlights'])
        : copy.about,
    socialLinks: socialLinks.length > 0 ? withOfficialInstagram(socialLinks) : copy.socialLinks,
    outdoorDiningLocations:
      outdoorDiningLocations.length > 0
        ? outdoorDiningLocations
        : copy.outdoorDiningLocations,
    source: hasCmsContent ? 'sanity' : 'static',
  };
}
