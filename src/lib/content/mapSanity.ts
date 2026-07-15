import type { AboutStory } from '../../types/aboutStory';
import type { Accommodation } from '../../types/accommodation';
import type { CuratedEvent } from '../../types/curatedEvent';
import type { CuratedExperience } from '../../types/curatedExperience';
import type { DiningVenue, DiningViewType } from '../../types/diningVenue';
import type { GalleryCategory, GalleryPhoto } from '../../types/galleryPhoto';
import type { SocialLink } from '../../constants/siteSettings';
import type { SiteContent } from './types';
import { STATIC_SITE_CONTENT } from './fallback';

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function mapAccommodation(doc: Record<string, unknown>): Accommodation | null {
  const id = asString(doc.id);
  const name = asString(doc.name);
  const heroImage = asString(doc.heroImage);
  if (!id || !name || !heroImage) return null;

  return {
    id,
    name,
    tagline: asString(doc.tagline),
    heroImage,
    gallery: asStringArray(doc.gallery),
    description: asString(doc.description),
    amenities: asStringArray(doc.amenities),
    maxGuests: asNumber(doc.maxGuests, 2),
    priceFrom: asNumber(doc.priceFrom),
  };
}

function mapExperience(doc: Record<string, unknown>): CuratedExperience | null {
  const id = asString(doc.id);
  const name = asString(doc.name);
  const heroImage = asString(doc.heroImage);
  if (!id || !name || !heroImage) return null;

  return {
    id,
    name,
    tagline: asString(doc.tagline),
    heroImage,
    gallery: asStringArray(doc.gallery),
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
  const id = asString(doc.id);
  const name = asString(doc.name);
  const heroImage = asString(doc.heroImage);
  const viewType = asString(doc.viewType) as DiningViewType;
  if (!id || !name || !heroImage) return null;
  if (viewType !== 'menu' && viewType !== 'form') return null;

  return {
    id,
    name,
    tagline: asString(doc.tagline),
    heroImage,
    viewType,
    ...(viewType === 'menu' ? { menuImages: asStringArray(doc.menuImages) } : {}),
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
  const id = asString(doc.id);
  const src = asString(doc.src);
  const alt = asString(doc.alt);
  const category = asString(doc.category) as GalleryCategory;
  if (!id || !src || !alt || !GALLERY_CATEGORIES.has(category)) return null;
  return { id, src, alt, category };
}

function mapAbout(doc: Record<string, unknown>): AboutStory | null {
  const id = asString(doc.id);
  const name = asString(doc.name);
  const heroImage = asString(doc.heroImage);
  if (!id || !name || !heroImage) return null;

  return {
    id,
    name,
    tagline: asString(doc.tagline),
    heroImage,
    gallery: asStringArray(doc.gallery),
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

export function mapSanityPayload(payload: Record<string, unknown>): SiteContent {
  const settings =
    payload.settings && typeof payload.settings === 'object'
      ? (payload.settings as Record<string, unknown>)
      : {};

  const accommodations = Array.isArray(payload.accommodations)
    ? payload.accommodations
        .map((doc) => mapAccommodation(doc as Record<string, unknown>))
        .filter((item): item is Accommodation => item !== null)
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

  return {
    accommodations: accommodations.length > 0 ? accommodations : STATIC_SITE_CONTENT.accommodations,
    experiences: experiences.length > 0 ? experiences : STATIC_SITE_CONTENT.experiences,
    events: events.length > 0 ? events : STATIC_SITE_CONTENT.events,
    dining: dining.length > 0 ? dining : STATIC_SITE_CONTENT.dining,
    gallery: gallery.length > 0 ? gallery : STATIC_SITE_CONTENT.gallery,
    about: about.length > 0 ? about : STATIC_SITE_CONTENT.about,
    socialLinks: socialLinks.length > 0 ? socialLinks : STATIC_SITE_CONTENT.socialLinks,
    outdoorDiningLocations:
      outdoorDiningLocations.length > 0
        ? outdoorDiningLocations
        : STATIC_SITE_CONTENT.outdoorDiningLocations,
    source: hasCmsContent ? 'sanity' : 'static',
  };
}
