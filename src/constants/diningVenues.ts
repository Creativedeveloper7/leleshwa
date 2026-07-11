import type { DiningVenue } from '../types/diningVenue';

export const DINING_VENUES: DiningVenue[] = [
  {
    id: 'boma-restaurant',
    name: 'Boma Restaurant',
    tagline: 'Fire-grilled, farm-fresh.',
    heroImage: '/images/rest.png',
    viewType: 'menu',
    menuImages: [
      '/images/rest.png',
      '/images/restaurant.png',
      '/images/sunset.png',
      '/images/main%20house.png',
    ],
  },
  {
    id: 'acacia-bar',
    name: 'Acacia Bar',
    tagline: 'Sunset sips and cocktails.',
    heroImage: '/images/bar.png',
    viewType: 'menu',
    menuImages: [
      '/images/bar.png',
      '/images/restaurant.png',
      '/images/sunset.png',
      '/images/bar.png',
    ],
  },
  {
    id: 'outdoor-dining',
    name: 'Outdoor Dining',
    tagline: 'Tailor-made, under the sky.',
    heroImage: '/images/restaurant.png',
    viewType: 'form',
  },
];

export const OUTDOOR_DINING_LOCATIONS = ['Cliffside', 'Garden', 'Riverside'];

export function getDiningVenueById(id: string): DiningVenue | undefined {
  return DINING_VENUES.find((venue) => venue.id === id);
}
