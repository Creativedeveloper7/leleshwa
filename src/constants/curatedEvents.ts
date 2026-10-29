import type { CuratedEvent } from '../types/curatedEvent';

export const CURATED_EVENTS: CuratedEvent[] = [
  {
    id: 'conference-rooms',
    name: 'Conference Rooms',
    tagline: 'Conference venue near Nairobi for up to 60 delegates.',
    heroImage: '/images/main-house.webp',
    gallery: [
      '/images/main-house.webp',
      '/images/rest.webp',
      '/images/bar.webp',
      '/images/chopper.webp',
    ],
    description:
      'Flexible conference and meeting rooms just outside Nairobi, designed for focus and flow. AV-ready rooms with high-speed Wi-Fi open onto park views, giving your team a setting that sharpens thinking — without the traffic and sterility of a city boardroom.',
    highlights: [
      'AV & presentation equipment',
      'High-speed Wi-Fi',
      'Breakout areas',
      'Catering packages',
      'Natural daylight',
      'Dedicated coordinator',
    ],
    duration: 'Full day',
    maxGuests: 60,
    priceFrom: 95000,
    priceUnit: 'per day',
  },
  {
    id: 'corporate-retreats',
    name: 'Corporate Retreats',
    tagline: 'Multi-day corporate retreats with meals and rooms included.',
    heroImage: '/images/rest.webp',
    gallery: [
      '/images/rest.webp',
      '/images/main-house.webp',
      '/images/naturewalk.webp',
      '/images/sunset.webp',
    ],
    description:
      'Multi-day corporate retreats near Nairobi combining productive sessions, accommodation and all meals with restorative bush surroundings. From plenary meetings to informal fireside debriefs, every detail is curated for clarity and connection.',
    highlights: [
      'Multi-day packages',
      'Meeting pavilion',
      'Team activities',
      'Accommodation blocks',
      'All meals included',
      'Transport coordination',
    ],
    duration: '2–3 days',
    maxGuests: 80,
    priceFrom: 185000,
    priceUnit: 'per day',
  },
  {
    id: 'private-events',
    name: 'Private Events',
    tagline: 'Birthday parties, anniversaries and private events near Nairobi.',
    heroImage: '/images/bar.webp',
    gallery: [
      '/images/bar.webp',
      '/images/restaurant.webp',
      '/images/sunset.webp',
      '/images/rest.webp',
    ],
    description:
      'Birthdays, anniversaries, launches, and intimate gatherings brought to life with bespoke styling, curated menus, and the backdrop of Nairobi National Park. A private event venue near Nairobi, entirely on your terms.',
    highlights: [
      'Custom event styling',
      'Private bar service',
      'Bespoke menus',
      'Live music options',
      'Photography spots',
      'Dedicated event host',
    ],
    duration: 'Half day',
    maxGuests: 100,
    priceFrom: 120000,
    priceUnit: 'per event',
  },
  {
    id: 'weddings',
    name: 'Weddings',
    tagline: 'Garden wedding venue near Nairobi for up to 150 guests.',
    heroImage: '/images/wedding.webp',
    gallery: [
      '/images/wedding.webp',
      '/images/sunset.webp',
      '/images/restaurant.webp',
      '/images/main-house.webp',
    ],
    description:
      'Exchange vows at one of the most scenic outdoor wedding venues near Nairobi — open plains, golden light and sunset photography beside Nairobi National Park. From ceremony lawn to reception pavilion, catering and décor, our team plans a wedding day as unforgettable as the landscape itself.',
    highlights: [
      'Ceremony lawn',
      'Reception pavilion',
      'Bridal suite access',
      'Floral & décor coordination',
      'Custom wedding menu',
      'Sunset photography',
    ],
    duration: 'Full day',
    maxGuests: 150,
    priceFrom: 450000,
    priceUnit: 'per event',
  },
  {
    id: 'team-building',
    name: 'Team Building',
    tagline: 'Outdoor team building venue near Nairobi.',
    heroImage: '/images/camping.webp',
    gallery: [
      '/images/camping.webp',
      '/images/archery.webp',
      '/images/naturewalk.webp',
      '/images/chopper.webp',
    ],
    description:
      'Facilitated outdoor challenges that strengthen collaboration and communication. From problem-solving in the bush to shared adventures on the lawn, teams leave with renewed connection and lasting memories.',
    highlights: [
      'Facilitated programmes',
      'Custom group sizes',
      'Indoor & outdoor options',
      'Debrief sessions',
      'Catering add-ons',
      'Corporate packages',
    ],
    duration: 'Half day',
    maxGuests: 40,
    priceFrom: 55000,
    priceUnit: 'per day',
  },
  {
    id: 'pavilion-hire',
    name: 'Pavilion Hire',
    tagline: 'Open-air venue hire near Nairobi for up to 200 guests.',
    heroImage: '/images/main-house.webp',
    gallery: [
      '/images/main-house.webp',
      '/images/sunset.webp',
      '/images/restaurant.webp',
      '/images/rest.webp',
    ],
    description:
      'Hire the pavilion for your own production — product launches, exhibitions, film shoots, or private celebrations. A versatile open-air venue with panoramic views and full support from our events team.',
    highlights: [
      'Panoramic valley views',
      'Flexible floor plan',
      'Power & lighting access',
      'Green room available',
      'Load-in support',
      'Hourly or daily hire',
    ],
    duration: 'Flexible',
    maxGuests: 200,
    priceFrom: 75000,
    priceUnit: 'per day',
  },
];

export function getCuratedEventById(id: string): CuratedEvent | undefined {
  return CURATED_EVENTS.find((event) => event.id === id);
}

export function getRelatedEvents(id: string): CuratedEvent[] {
  return CURATED_EVENTS.filter((event) => event.id !== id);
}
