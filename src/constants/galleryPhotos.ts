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
  photo('ov-1', '/images/sunset.webp', 'Golden sunset at Leleshwa Getaway near Nairobi National Park', 'outside-view'),
  photo('ov-2', '/images/naturewalk.webp', 'Indigenous bushland trail at dawn', 'outside-view'),
  photo('ov-3', '/images/main-house.webp', 'Leleshwa Getaway lodge terrace overlooking open plains near Nairobi', 'outside-view'),
  photo('ov-4', '/images/camping.webp', 'Glamping safari tents beneath acacia trees near Nairobi', 'outside-view'),
  photo('ov-5', '/images/chopper.webp', 'Aerial view of the Leleshwa valley landscape', 'outside-view'),
  photo('ov-6', '/images/main-house.webp', 'Main lodge framed against rolling hills', 'outside-view'),

  // Restaurant
  photo('rest-1', '/images/rest.webp', 'The Boma Restaurant interior with warm firelight', 'restaurant'),
  photo('rest-2', '/images/restaurant.webp', 'Elegant table setting for fine dining', 'restaurant'),
  photo('rest-3', '/images/sunset.webp', 'Restaurant terrace at golden hour', 'restaurant'),
  photo('rest-4', '/images/main-house.webp', 'Private dining room with valley views', 'restaurant'),
  photo('rest-5', '/images/bar.webp', 'Evening ambience in the dining pavilion', 'restaurant'),

  // Bar
  photo('bar-1', '/images/bar.webp', 'Acacia Bar counter with premium spirits', 'bar'),
  photo('bar-2', '/images/restaurant.webp', 'Craft cocktails prepared at sunset', 'bar'),
  photo('bar-3', '/images/sunset.webp', 'Sundowner service on the open terrace', 'bar'),
  photo('bar-4', '/images/rest.webp', 'Intimate bar seating with soft lantern light', 'bar'),
  photo('bar-5', '/images/chopper.webp', 'Chilled wine service with valley views', 'bar'),

  // Culinary
  photo('cul-1', '/images/rest.webp', 'Farm-fresh ingredients prepared fire-side', 'culinary'),
  photo('cul-2', '/images/restaurant.webp', 'Chef-plated seasonal tasting course', 'culinary'),
  photo('cul-3', '/images/sunset.webp', 'Outdoor culinary experience at dusk', 'culinary'),
  photo('cul-4', '/images/wedding.webp', 'Celebration feast under the savanna sky', 'culinary'),
  photo('cul-5', '/images/main-house.webp', 'Artisan bread and local produce display', 'culinary'),

  // Events
  photo('evt-1', '/images/main-house.webp', 'Conference venue near Nairobi set for a corporate retreat', 'events'),
  photo('evt-2', '/images/wedding.webp', 'Outdoor garden wedding ceremony at Leleshwa Getaway near Nairobi', 'events'),
  photo('evt-3', '/images/camping.webp', 'Team building activity in the open bush near Nairobi', 'events'),
  photo('evt-4', '/images/chopper.webp', 'Executive arrival for a valley-side event', 'events'),
  photo('evt-5', '/images/rest.webp', 'Banquet tables arranged for a gala dinner', 'events'),

  // Experiences
  photo('exp-1', '/images/archery.webp', 'Guest practising archery near Nairobi at Leleshwa Getaway', 'experiences'),
  photo('exp-2', '/images/naturewalk.webp', 'Guided nature walk through indigenous flora', 'experiences'),
  photo('exp-3', '/images/camping.webp', 'Bonfire gathering beneath a starlit sky', 'experiences'),
  photo('exp-4', '/images/chopper.webp', 'Outdoor games on the manicured lawn', 'experiences'),
  photo('exp-5', '/images/sunset.webp', 'Bird watching at dawn in the valley', 'experiences'),

  // Accommodations
  photo('acc-1', '/images/main-house.webp', 'Luxury suite with floor-to-ceiling valley views', 'accommodations'),
  photo('acc-2', '/images/villa-2.webp', 'Executive room with garden outlook', 'accommodations'),
  photo('acc-3', '/images/camping.webp', 'Safari tent interior with refined finishes', 'accommodations'),
  photo('acc-4', '/images/main-house.webp', 'Garden cottage surrounded by native bush', 'accommodations'),
  photo('acc-5', '/images/sunset.webp', 'Private plunge deck at sunset', 'accommodations'),
  photo('acc-6', '/images/rest.webp', 'In-room dining setup in a luxury suite', 'accommodations'),
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
