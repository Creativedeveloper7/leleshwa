/**
 * Seeds Sanity with the site's static content.
 *
 * Usage:
 *   1. Create a write token at https://www.sanity.io/manage/project/th48chxn/api
 *   2. Add SANITY_API_WRITE_TOKEN to .env
 *   3. npm run seed:sanity
 *
 * Note: Document `_id` values must NOT contain dots. This project's public
 * ACL uses `_id in path("*")`, which only matches single-segment IDs.
 * Use hyphens: `accommodation-luxury-suites`, not `accommodation.luxury-suites`.
 *
 * Image fields are Sanity `image` assets (upload from Studio).
 * This seed still writes legacy path strings for bootstrap text/content.
 * After seeding, open Studio and upload/replace hero & gallery images.
 */

import { createClient } from '@sanity/client';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ABOUT_STORIES } from '../src/constants/aboutStories';
import { ACCOMMODATIONS } from '../src/constants/accommodations';
import { CURATED_EVENTS } from '../src/constants/curatedEvents';
import { CURATED_EXPERIENCES } from '../src/constants/curatedExperiences';
import { DINING_VENUES, OUTDOOR_DINING_LOCATIONS } from '../src/constants/diningVenues';
import { GALLERY_PHOTOS } from '../src/constants/galleryPhotos';
import { SOCIAL_LINKS } from '../src/constants/siteSettings';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnvFile() {
  const envPath = resolve(root, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const eq = trimmed.indexOf('=');
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'th48chxn';
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN. Create one in Sanity manage and add it to .env');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
});

function slug(id: string) {
  return { _type: 'slug' as const, current: id };
}

/** Public ACL matches single-segment IDs only — never use dots in `_id`. */
function docId(prefix: string, id: string) {
  return `${prefix}-${id}`;
}

async function main() {
  const docs: Record<string, unknown>[] = [];
  const obsoleteIds: string[] = [];

  for (const item of ACCOMMODATIONS) {
    docs.push({
      _id: docId('accommodation', item.id),
      _type: 'accommodation',
      id: slug(item.id),
      name: item.name,
      tagline: item.tagline,
      heroImage: item.heroImage,
      gallery: item.gallery,
      description: item.description,
      amenities: item.amenities,
      maxGuests: item.maxGuests,
      priceFrom: item.priceFrom,
    });
    obsoleteIds.push(`accommodation.${item.id}`, `drafts.accommodation.${item.id}`);
  }

  for (const item of CURATED_EXPERIENCES) {
    docs.push({
      _id: docId('experience', item.id),
      _type: 'curatedExperience',
      id: slug(item.id),
      name: item.name,
      tagline: item.tagline,
      heroImage: item.heroImage,
      gallery: item.gallery,
      description: item.description,
      highlights: item.highlights,
      duration: item.duration,
      maxGuests: item.maxGuests,
      priceFrom: item.priceFrom,
    });
    obsoleteIds.push(`experience.${item.id}`, `drafts.experience.${item.id}`);
  }

  for (const item of CURATED_EVENTS) {
    docs.push({
      _id: docId('event', item.id),
      _type: 'curatedEvent',
      id: slug(item.id),
      name: item.name,
      tagline: item.tagline,
      heroImage: item.heroImage,
      gallery: item.gallery,
      description: item.description,
      highlights: item.highlights,
      duration: item.duration,
      maxGuests: item.maxGuests,
      priceFrom: item.priceFrom,
      priceUnit: item.priceUnit,
    });
    obsoleteIds.push(`event.${item.id}`, `drafts.event.${item.id}`);
  }

  for (const item of DINING_VENUES) {
    docs.push({
      _id: docId('dining', item.id),
      _type: 'diningVenue',
      id: slug(item.id),
      name: item.name,
      tagline: item.tagline,
      heroImage: item.heroImage,
      viewType: item.viewType,
      ...(item.menuImages ? { menuImages: item.menuImages } : {}),
    });
    obsoleteIds.push(`dining.${item.id}`, `drafts.dining.${item.id}`);
  }

  for (const item of GALLERY_PHOTOS) {
    docs.push({
      _id: docId('gallery', item.id),
      _type: 'galleryPhoto',
      id: slug(item.id),
      src: item.src,
      alt: item.alt,
      category: item.category,
    });
    obsoleteIds.push(`gallery.${item.id}`, `drafts.gallery.${item.id}`);
  }

  for (const item of ABOUT_STORIES) {
    docs.push({
      _id: docId('about', item.id),
      _type: 'aboutStory',
      id: slug(item.id),
      name: item.name,
      tagline: item.tagline,
      heroImage: item.heroImage,
      gallery: item.gallery,
      description: item.description,
      highlights: item.highlights,
    });
    obsoleteIds.push(`about.${item.id}`, `drafts.about.${item.id}`);
  }

  docs.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Leleshwa Getaway',
    socialLinks: SOCIAL_LINKS.map((link) => ({
      _type: 'socialLink',
      _key: link.id,
      id: link.id,
      label: link.label,
      href: link.href,
    })),
    outdoorDiningLocations: OUTDOOR_DINING_LOCATIONS,
  });

  // Remove deprecated Family Villas + probe docs
  obsoleteIds.push(
    'accommodation.family-villas',
    'drafts.accommodation.family-villas',
    'accommodation-family-villas',
    'accommodation.test-seed',
  );

  console.log(`Seeding ${docs.length} documents to ${projectId}/${dataset}…`);

  const tx = client.transaction();
  for (const id of obsoleteIds) {
    tx.delete(id);
  }
  for (const doc of docs) {
    tx.createOrReplace(doc);
  }
  await tx.commit();

  const publicCount = await fetch(
    `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${encodeURIComponent('count(*[_type=="accommodation"])')}`,
  ).then((r) => r.json());

  console.log('Seed complete.');
  console.log(`Public accommodation count (unauthenticated): ${publicCount.result}`);
  if (!publicCount.result) {
    console.warn(
      'WARNING: Public reads still return 0. In Sanity Manage → API / Content permissions, set the public group filter to `_id in path("**")`.',
    );
  } else {
    console.log('Public website can read CMS content. Open Studio to upload images.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
