import type { Accommodation } from '../types/accommodation';

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'luxury-suites',
    name: 'Luxury Suites',
    tagline: 'Our top luxury rooms near Nairobi — floor-to-ceiling glass and a private plunge deck.',
    heroImage: '/images/main-house.webp',
    gallery: [
      '/images/main-house.webp',
      '/images/villa-2.webp',
      '/images/sunset.webp',
      '/images/rest.webp',
    ],
    description:
      'Wake to panoramic views over Nairobi National Park from your private suite, just 25km from Nairobi CBD. Floor-to-ceiling glass brings the wilderness indoors, while a secluded plunge deck sets the scene for slow mornings, honeymoons, anniversaries and golden-hour sundowners. The ideal romantic getaway near Nairobi.',
    amenities: ['Private plunge deck', 'King bed', 'Rainfall shower', 'Park views', 'In-room dining', 'Wi-Fi'],
    maxGuests: 2,
    priceFrom: 28500,
  },
  {
    id: 'executive-rooms',
    name: 'Executive Rooms',
    tagline: 'Quiet, Wi-Fi ready rooms for business stays and solo travellers near Nairobi.',
    heroImage: '/images/villa-2.webp',
    gallery: [
      '/images/villa-2.webp',
      '/images/rest.webp',
      '/images/sunset.webp',
      '/images/bar.webp',
    ],
    description:
      'Designed for guests who value calm and efficiency, each executive room pairs refined finishes with a dedicated workspace, fast Wi-Fi and a garden outlook. Ideal for business travellers, conference delegates and remote workers who want a peaceful base outside Nairobi.',
    amenities: ['Work desk', 'Garden view', 'Queen bed', 'Ensuite bathroom', 'Tea & coffee station', 'Wi-Fi'],
    maxGuests: 2,
    priceFrom: 19500,
  },
  {
    id: 'garden-cottages',
    name: 'Garden Cottages',
    tagline: 'Private garden cottages for couples — breakfast included.',
    heroImage: '/images/rest.webp',
    gallery: [
      '/images/rest.webp',
      '/images/restaurant.webp',
      '/images/bar.webp',
      '/images/naturewalk.webp',
    ],
    description:
      'Nestled within lush indigenous gardens, each cottage offers a private patio, an outdoor shower and breakfast included. A favourite with couples looking for a quiet weekend getaway or staycation close to Nairobi.',
    amenities: ['Private patio', 'Queen bed', 'Outdoor shower', 'Garden setting', 'Breakfast included', 'Wi-Fi'],
    maxGuests: 2,
    priceFrom: 22000,
  },
  {
    id: 'safari-tents',
    name: 'Safari Tents',
    tagline: 'Luxury glamping near Nairobi — real beds, ensuite bathrooms, open sky.',
    heroImage: '/images/camping.webp',
    gallery: [
      '/images/camping.webp',
      '/images/naturewalk.webp',
      '/images/sunset.webp',
      '/images/archery.webp',
    ],
    description:
      'Go glamping near Nairobi without giving up comfort. Our elevated safari tents have proper beds, ensuite bathrooms, a private stargazing deck and campfire access — a safari-style camping experience beside Nairobi National Park, without the long drive.',
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
