import type { CuratedExperience } from '../types/curatedExperience';

export const CURATED_EXPERIENCES: CuratedExperience[] = [
  {
    id: 'archery',
    name: 'Archery',
    tagline: 'Archery near Nairobi for beginners, families and groups — all gear provided.',
    heroImage: '/images/archery.webp',
    gallery: ['/images/archery.webp', '/images/naturewalk.webp', '/images/camping.webp', '/images/sunset.webp'],
    description:
      'Step onto the range with patient instructors who guide every draw and release. Archery at Leleshwa is one of the most popular outdoor activities near Nairobi — fun for beginners, families, birthday groups and corporate teams alike.',
    highlights: ['Expert instruction', 'All equipment provided', 'Safe range setting', 'All skill levels', 'Family friendly', 'Scenic backdrop'],
    duration: '1.5 hours',
    maxGuests: 8,
    priceFrom: 3500,
  },
  {
    id: 'nature-walks',
    name: 'Nature Walks',
    tagline: 'Guided nature walks beside Nairobi National Park.',
    heroImage: '/images/naturewalk.webp',
    gallery: ['/images/naturewalk.webp', '/images/sunset.webp', '/images/main-house.webp', '/images/camping.webp'],
    description:
      'Walk ancient trails with guides who know every bird call and native plant. Dawn walks reveal the valley waking — mist on the grass, light through the acacia, and the quiet rhythm of the wild just beyond Nairobi.',
    highlights: ['Guided naturalist walks', 'Indigenous flora & fauna', 'Dawn & dusk departures', 'Binoculars available', 'Easy to moderate trails', 'Photography stops'],
    duration: '2 hours',
    maxGuests: 12,
    priceFrom: 2500,
  },
  {
    id: 'sundowners',
    name: 'Sundowners',
    tagline: 'The best sunset views near Nairobi, cocktail in hand.',
    heroImage: '/images/restaurant.webp',
    gallery: ['/images/restaurant.webp', '/images/sunset.webp', '/images/bar.webp', '/images/rest.webp'],
    description:
      'As the sky over Nairobi National Park ignites at dusk, settle into a curated sundowner ritual. Signature cocktails, chilled wine, and small plates arrive as the horizon shifts from amber to violet — the quintessential Leleshwa evening.',
    highlights: ['Signature cocktails', 'Sunset views', 'Canapés & small plates', 'Private setups available', 'Live acoustic option', 'Premium spirits'],
    duration: '2 hours',
    maxGuests: 20,
    priceFrom: 4500,
  },
  {
    id: 'bonfire-nights',
    name: 'Bonfire Nights',
    tagline: 'Campfire nights and stargazing, minutes from the city.',
    heroImage: '/images/camping.webp',
    gallery: ['/images/camping.webp', '/images/sunset.webp', '/images/archery.webp', '/images/naturewalk.webp'],
    description:
      'Gather around a crackling fire as stars emerge over the valley. Share stories, sip something warm, and let the night unfold with the sounds of the bush — an intimate, unhurried Leleshwa tradition.',
    highlights: ['Open-air fire pit', 'Marshmallows & hot drinks', 'Stargazing', 'Blankets provided', 'Group storytelling', 'Evening ambience'],
    duration: '3 hours',
    maxGuests: 24,
    priceFrom: 3000,
  },
  {
    id: 'outdoor-games',
    name: 'Outdoor Games',
    tagline: 'Lawn games for families, friends and corporate groups.',
    heroImage: '/images/chopper.webp',
    gallery: ['/images/chopper.webp', '/images/camping.webp', '/images/main-house.webp', '/images/rest.webp'],
    description:
      'Lawn games on manicured grass with valley views as your backdrop. Croquet, bocce, and classic outdoor pastimes invite laughter and light competition — perfect for families, friends, and corporate groups.',
    highlights: ['Croquet & bocce', 'Lawn games equipment', 'Facilitated sessions', 'Team formats', 'Refreshments on request', 'Shaded seating'],
    duration: '2 hours',
    maxGuests: 16,
    priceFrom: 2800,
  },
  {
    id: 'corporate-retreats',
    name: 'Corporate Retreats',
    tagline: 'A corporate retreat venue near Nairobi that sharpens thinking.',
    heroImage: '/images/main-house.webp',
    gallery: ['/images/main-house.webp', '/images/rest.webp', '/images/bar.webp', '/images/chopper.webp'],
    description:
      'Leave the boardroom behind for a setting that sharpens thinking and restores focus. Flexible meeting spaces, breakout areas, and curated hospitality support productive retreats with a distinctly Leleshwa atmosphere.',
    highlights: ['Meeting pavilion', 'AV equipment', 'Catering packages', 'Breakout spaces', 'Team activities', 'Dedicated coordinator'],
    duration: 'Full day',
    maxGuests: 40,
    priceFrom: 8500,
  },
  {
    id: 'team-building',
    name: 'Team Building',
    tagline: 'Team building activities near Nairobi, set in the open bush.',
    heroImage: '/images/naturewalk.webp',
    gallery: ['/images/naturewalk.webp', '/images/archery.webp', '/images/camping.webp', '/images/chopper.webp'],
    description:
      'Facilitated team building activities designed to strengthen collaboration and communication. From problem-solving in the bush to shared adventures on the lawn, teams leave with renewed connection and lasting memories.',
    highlights: ['Facilitated programmes', 'Custom group sizes', 'Indoor & outdoor options', 'Debrief sessions', 'Catering add-ons', 'Corporate packages'],
    duration: 'Half day',
    maxGuests: 30,
    priceFrom: 5500,
  },
  {
    id: 'bird-watching',
    name: 'Bird Watching',
    tagline: 'Bird watching near Nairobi — over 200 species recorded.',
    heroImage: '/images/sunset.webp',
    gallery: ['/images/sunset.webp', '/images/naturewalk.webp', '/images/camping.webp', '/images/restaurant.webp'],
    description:
      'Accompanied by knowledgeable guides, discover the extraordinary birdlife of the Leleshwa valley. Early mornings offer the richest sightings — from raptors on thermals to colourful sunbirds in the garden.',
    highlights: ['Expert birding guides', '200+ species recorded', 'Binoculars provided', 'Species checklist', 'Dawn departures', 'Photography friendly'],
    duration: '2.5 hours',
    maxGuests: 10,
    priceFrom: 3200,
  },
];

export function getCuratedExperienceById(id: string): CuratedExperience | undefined {
  return CURATED_EXPERIENCES.find((e) => e.id === id);
}

export function getRelatedExperiences(id: string): CuratedExperience[] {
  return CURATED_EXPERIENCES.filter((e) => e.id !== id);
}
