import type { Accommodation } from '../types/accommodation';

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'luxury-suites',
    name: 'Luxury Suites',
    tagline: 'Floor-to-ceiling glass framing the savanna, with a private plunge deck.',
    heroImage: '/images/main%20house.png',
    gallery: [
      '/images/main%20house.png',
      '/images/villa%202.png',
      '/images/sunset.png',
      '/images/rest.png',
    ],
    description:
      'Wake to panoramic views across the Rift Valley from your private suite. Floor-to-ceiling glass dissolves the boundary between indoors and wilderness, while a secluded plunge deck invites slow mornings and golden-hour sundowners.',
    amenities: ['Private plunge deck', 'King bed', 'Rainfall shower', 'Valley views', 'In-room dining', 'Wi-Fi'],
    maxGuests: 2,
    priceFrom: 28500,
  },
  {
    id: 'executive-rooms',
    name: 'Executive Rooms',
    tagline: 'Considered comfort for the discerning solo or business traveller.',
    heroImage: '/images/villa%202.png',
    gallery: [
      '/images/villa%202.png',
      '/images/rest.png',
      '/images/sunset.png',
      '/images/bar.png',
    ],
    description:
      'Designed for guests who value calm and efficiency, each executive room pairs refined finishes with a dedicated workspace and garden outlook. Ideal for solo travellers or short business stays seeking quiet luxury.',
    amenities: ['Work desk', 'Garden view', 'Queen bed', 'Ensuite bathroom', 'Tea & coffee station', 'Wi-Fi'],
    maxGuests: 2,
    priceFrom: 19500,
  },
  {
    id: 'garden-cottages',
    name: 'Garden Cottages',
    tagline: 'Tucked among indigenous flora, intimate and quietly luxurious.',
    heroImage: '/images/rest.png',
    gallery: [
      '/images/rest.png',
      '/images/restaurant.png',
      '/images/bar.png',
      '/images/naturewalk.png',
    ],
    description:
      'Nestled within lush indigenous planting, each cottage offers an intimate escape with private outdoor seating and the gentle sounds of the valley. A favourite for couples seeking seclusion without sacrificing comfort.',
    amenities: ['Private patio', 'Queen bed', 'Outdoor shower', 'Garden setting', 'Breakfast included', 'Wi-Fi'],
    maxGuests: 2,
    priceFrom: 22000,
  },
  {
    id: 'safari-tents',
    name: 'Safari Tents',
    tagline: "Canvas-walled comfort, the closest you'll sleep to the wild.",
    heroImage: '/images/camping.png',
    gallery: [
      '/images/camping.png',
      '/images/naturewalk.png',
      '/images/sunset.png',
      '/images/archery.png',
    ],
    description:
      'Experience the romance of canvas without compromising on luxury. Elevated safari tents feature proper beds, ensuite facilities, and a deck where the night sky feels within reach.',
    amenities: ['Elevated deck', 'Ensuite bathroom', 'Canvas walls', 'Stargazing deck', 'Campfire access', 'Guided walks'],
    maxGuests: 2,
    priceFrom: 16500,
  },
];

export function getAccommodationById(id: string): Accommodation | undefined {
  return ACCOMMODATIONS.find((a) => a.id === id);
}

export function getRelatedAccommodations(id: string): Accommodation[] {
  return ACCOMMODATIONS.filter((a) => a.id !== id);
}
