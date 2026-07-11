import type { GalleryCategory, GalleryFilterId, GalleryPhoto } from '../types/galleryPhoto';

function photo(
  id: string,
  src: string,
  alt: string,
  category: GalleryCategory,
): GalleryPhoto {
  return { id, src, alt, category };
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  // Outside view
  photo('ov-1', '/images/sunset.png', 'Golden sunset over the Rift Valley escarpment', 'outside-view'),
  photo('ov-2', '/images/naturewalk.png', 'Indigenous bushland trail at dawn', 'outside-view'),
  photo('ov-3', '/images/villa.png', 'Luxury suite terrace overlooking open plains', 'outside-view'),
  photo('ov-4', '/images/camping.png', 'Safari tents nestled beneath acacia trees', 'outside-view'),
  photo('ov-5', '/images/chopper.png', 'Aerial view of the Leleshwa valley landscape', 'outside-view'),
  photo('ov-6', '/images/main%20house.png', 'Main lodge framed against rolling hills', 'outside-view'),

  // Restaurant
  photo('rest-1', '/images/rest.png', 'The Boma Restaurant interior with warm firelight', 'restaurant'),
  photo('rest-2', '/images/restaurant.png', 'Elegant table setting for fine dining', 'restaurant'),
  photo('rest-3', '/images/sunset.png', 'Restaurant terrace at golden hour', 'restaurant'),
  photo('rest-4', '/images/main%20house.png', 'Private dining room with valley views', 'restaurant'),
  photo('rest-5', '/images/bar.png', 'Evening ambience in the dining pavilion', 'restaurant'),

  // Bar
  photo('bar-1', '/images/bar.png', 'Acacia Bar counter with premium spirits', 'bar'),
  photo('bar-2', '/images/restaurant.png', 'Craft cocktails prepared at sunset', 'bar'),
  photo('bar-3', '/images/sunset.png', 'Sundowner service on the open terrace', 'bar'),
  photo('bar-4', '/images/rest.png', 'Intimate bar seating with soft lantern light', 'bar'),
  photo('bar-5', '/images/villa.png', 'Chilled wine service on the plunge deck', 'bar'),

  // Culinary
  photo('cul-1', '/images/rest.png', 'Farm-fresh ingredients prepared fire-side', 'culinary'),
  photo('cul-2', '/images/restaurant.png', 'Chef-plated seasonal tasting course', 'culinary'),
  photo('cul-3', '/images/sunset.png', 'Outdoor culinary experience at dusk', 'culinary'),
  photo('cul-4', '/images/wedding.png', 'Celebration feast under the savanna sky', 'culinary'),
  photo('cul-5', '/images/main%20house.png', 'Artisan bread and local produce display', 'culinary'),

  // Events
  photo('evt-1', '/images/main%20house.png', 'Conference pavilion set for a corporate retreat', 'events'),
  photo('evt-2', '/images/wedding.png', 'Private wedding ceremony on the lawn', 'events'),
  photo('evt-3', '/images/camping.png', 'Team-building session in the open bush', 'events'),
  photo('evt-4', '/images/chopper.png', 'Executive arrival for a valley-side event', 'events'),
  photo('evt-5', '/images/rest.png', 'Banquet tables arranged for a gala dinner', 'events'),

  // Experiences
  photo('exp-1', '/images/archery.png', 'Guest practising archery on the range', 'experiences'),
  photo('exp-2', '/images/naturewalk.png', 'Guided nature walk through indigenous flora', 'experiences'),
  photo('exp-3', '/images/camping.png', 'Bonfire gathering beneath a starlit sky', 'experiences'),
  photo('exp-4', '/images/chopper.png', 'Outdoor games on the manicured lawn', 'experiences'),
  photo('exp-5', '/images/sunset.png', 'Bird watching at dawn in the valley', 'experiences'),

  // Accommodations
  photo('acc-1', '/images/villa.png', 'Luxury suite with floor-to-ceiling valley views', 'accommodations'),
  photo('acc-2', '/images/villa%202.png', 'Executive room with garden outlook', 'accommodations'),
  photo('acc-3', '/images/camping.png', 'Safari tent interior with refined finishes', 'accommodations'),
  photo('acc-4', '/images/main%20house.png', 'Garden cottage surrounded by native bush', 'accommodations'),
  photo('acc-5', '/images/sunset.png', 'Private plunge deck at sunset', 'accommodations'),
  photo('acc-6', '/images/rest.png', 'In-room dining setup in a luxury suite', 'accommodations'),
];

export const GALLERY_FILTERS: { id: GalleryFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'outside-view', label: 'Outside view' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'bar', label: 'Bar' },
  { id: 'culinary', label: 'Culinary' },
  { id: 'events', label: 'Events' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'accommodations', label: 'Accommodations' },
];

export const GALLERY_MASONRY_HEIGHTS = [280, 200, 340, 240, 300, 220, 260, 320];

export function filterGalleryPhotos(category: GalleryFilterId): GalleryPhoto[] {
  if (category === 'all') return GALLERY_PHOTOS;
  return GALLERY_PHOTOS.filter((photo) => photo.category === category);
}
