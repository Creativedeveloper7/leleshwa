import type { CuratedEvent } from '../types/curatedEvent';

export const CURATED_EVENTS: CuratedEvent[] = [
  {
    id: 'conference-rooms',
    name: 'Conference Rooms',
    tagline: 'Boardroom precision, bushland calm.',
    heroImage: '/images/main%20house.png',
    gallery: [
      '/images/main%20house.png',
      '/images/rest.png',
      '/images/bar.png',
      '/images/chopper.png',
    ],
    description:
      'Flexible meeting spaces designed for focus and flow. AV-ready conference rooms open onto valley views, giving your team a setting that sharpens thinking without the sterility of a city boardroom.',
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
    tagline: 'Strategy sessions with a view that inspires.',
    heroImage: '/images/rest.png',
    gallery: [
      '/images/rest.png',
      '/images/main%20house.png',
      '/images/naturewalk.png',
      '/images/sunset.png',
    ],
    description:
      'Multi-day corporate retreats combining productive sessions with restorative bush surroundings. From plenary meetings to informal fireside debriefs, every detail is curated for clarity and connection.',
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
    tagline: 'Celebrations shaped entirely around you.',
    heroImage: '/images/bar.png',
    gallery: [
      '/images/bar.png',
      '/images/restaurant.png',
      '/images/sunset.png',
      '/images/rest.png',
    ],
    description:
      'Birthdays, anniversaries, launches, and intimate gatherings brought to life with bespoke styling, curated menus, and the dramatic backdrop of the Rift Valley. Your event, entirely on your terms.',
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
    tagline: 'Vows beneath the savanna sky.',
    heroImage: '/images/wedding.png',
    gallery: [
      '/images/wedding.png',
      '/images/sunset.png',
      '/images/restaurant.png',
      '/images/villa.png',
    ],
    description:
      'Exchange vows in a setting of rare beauty — open plains, golden light, and the quiet grandeur of the valley. From ceremony to reception, our team crafts a wedding day as unforgettable as the landscape itself.',
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
    tagline: 'Built for trust, out in the open.',
    heroImage: '/images/camping.png',
    gallery: [
      '/images/camping.png',
      '/images/archery.png',
      '/images/naturewalk.png',
      '/images/chopper.png',
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
    tagline: 'An open-air venue above the valley.',
    heroImage: '/images/villa.png',
    gallery: [
      '/images/villa.png',
      '/images/sunset.png',
      '/images/main%20house.png',
      '/images/restaurant.png',
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
