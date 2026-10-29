import type { DiningVenue } from '../types/diningVenue';

export const DINING_VENUES: DiningVenue[] = [
  {
    id: 'boma-restaurant',
    name: 'Boma Restaurant',
    tagline: 'Fire-grilled, farm-fresh.',
    heroImage: '/images/rest.webp',
    viewType: 'menu',
    menuImages: [
      '/images/rest.webp',
      '/images/restaurant.webp',
      '/images/sunset.webp',
      '/images/main-house.webp',
    ],
  },
  {
    id: 'acacia-bar',
    name: 'Acacia Bar',
    tagline: 'Sunset sips and cocktails.',
    heroImage: '/images/bar.webp',
    viewType: 'menu',
    menuImages: [
      '/images/bar.webp',
      '/images/restaurant.webp',
      '/images/sunset.webp',
      '/images/bar.webp',
    ],
  },
  {
    id: 'outdoor-dining',
    name: 'Outdoor Dining',
    tagline: 'Tailor-made, under the sky.',
    heroImage: '/images/restaurant.webp',
    viewType: 'form',
  },
];

export const OUTDOOR_DINING_LOCATIONS = ['Cliffside', 'Garden', 'Riverside'];

export function getDiningVenueById(id: string): DiningVenue | undefined {
  return DINING_VENUES.find((venue) => venue.id === id);
}
