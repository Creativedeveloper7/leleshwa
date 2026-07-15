/**
 * Seeds Sanity with the site's static content.
 *
 * Usage:
 *   1. Create a write token at https://www.sanity.io/manage/project/th48chxn/api
 *   2. Add SANITY_API_WRITE_TOKEN to .env
 *   3. npm run seed:sanity
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
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
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

async function main() {
  const docs: Record<string, unknown>[] = [];

  for (const item of ACCOMMODATIONS) {
    docs.push({
      _id: `accommodation.${item.id}`,
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
  }

  for (const item of CURATED_EXPERIENCES) {
    docs.push({
      _id: `experience.${item.id}`,
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
  }

  for (const item of CURATED_EVENTS) {
    docs.push({
      _id: `event.${item.id}`,
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
  }

  for (const item of DINING_VENUES) {
    docs.push({
      _id: `dining.${item.id}`,
      _type: 'diningVenue',
      id: slug(item.id),
      name: item.name,
      tagline: item.tagline,
      heroImage: item.heroImage,
      viewType: item.viewType,
      ...(item.menuImages ? { menuImages: item.menuImages } : {}),
    });
  }

  for (const item of GALLERY_PHOTOS) {
    docs.push({
      _id: `gallery.${item.id}`,
      _type: 'galleryPhoto',
      id: slug(item.id),
      src: item.src,
      alt: item.alt,
      category: item.category,
    });
  }

  for (const item of ABOUT_STORIES) {
    docs.push({
      _id: `about.${item.id}`,
      _type: 'aboutStory',
      id: slug(item.id),
      name: item.name,
      tagline: item.tagline,
      heroImage: item.heroImage,
      gallery: item.gallery,
      description: item.description,
      highlights: item.highlights,
    });
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

  console.log(`Seeding ${docs.length} documents to ${projectId}/${dataset}…`);

  const tx = client.transaction();
  for (const doc of docs) {
    tx.createOrReplace(doc);
  }
  await tx.commit();

  console.log('Seed complete. Open the Studio to edit content.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
