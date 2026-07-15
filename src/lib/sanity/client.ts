import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? 'th48chxn';
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2025-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

export const isSanityConfigured = Boolean(projectId && dataset);
