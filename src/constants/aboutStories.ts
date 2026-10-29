import type { AboutStory } from '../types/aboutStory';

export const ABOUT_STORIES: AboutStory[] = [
  {
    id: 'our-story',
    name: 'Our Story',
    tagline: 'Born of the land, built for stillness.',
    heroImage: '/images/sunset.webp',
    gallery: [
      '/images/sunset.webp',
      '/images/main-house.webp',
      '/images/naturewalk.webp',
      '/images/rest.webp',
    ],
    description:
      'Perched on the edge of a gorge overlooking Nairobi National Park and Silole Sanctuary, Leleshwa Getaway is a cliffside nature retreat and event venue where comfort meets the beauty of the wild. Founded in 2010 and named after the iconic Leleshwa tree, our three-acre sanctuary sits in the Oloosirkon / Tuala area of Ongata Rongai, Kajiado County — past Africa Nazarene University and the Maasai Lodge Hotel, on Glass Lane right next to Kitengela Glass, only 25 kilometres from Nairobi CBD. From exquisite dining and breathtaking sunsets to curated family experiences and elegant event spaces, every moment is crafted to reconnect you with nature without leaving comfort behind.',
    highlights: [
      'Founded in 2010',
      'Named after the Leleshwa tree',
      '3-acre sanctuary',
      '25km from Nairobi CBD',
      'Next to Kitengela Glass, Ongata Rongai',
      'Cliffside views of Nairobi National Park',
    ],
  },
  {
    id: 'conservation',
    name: 'Conservation',
    tagline: 'Protecting the wild we share.',
    heroImage: '/images/naturewalk.webp',
    gallery: [
      '/images/naturewalk.webp',
      '/images/sunset.webp',
      '/images/camping.webp',
      '/images/archery.webp',
    ],
    description:
      'Leleshwa sits within a landscape where indigenous bushland, open grassland, and wildlife corridors remain vital. We are committed to protecting the wild we share — preserving native flora, respecting the rhythms of the valley, and offering guests a deeper connection to the land through guided walks, quiet observation, and thoughtful stewardship of our three-acre sanctuary.',
    highlights: [
      'Indigenous flora & fauna',
      'Wildlife corridor awareness',
      'Guided nature walks',
      'Sustainable land practices',
      'Minimal-impact development',
      'Partnership with local conservation',
    ],
  },
  {
    id: 'our-people',
    name: 'Our People',
    tagline: 'Local hands, local hearts.',
    heroImage: '/images/main-house.webp',
    gallery: [
      '/images/main-house.webp',
      '/images/rest.webp',
      '/images/bar.webp',
      '/images/sunset.webp',
    ],
    description:
      'Leleshwa is brought to life by a team rooted in the community — hosts, guides, chefs, and caretakers who know this valley intimately and welcome every guest as family. Whether you arrive for rest, celebration, or adventure, our people ensure that slowing down, exploring, and creating lasting memories feels effortless and genuinely warm.',
    highlights: [
      'Locally rooted hospitality team',
      'Expert guides & naturalists',
      'Farm-to-table kitchen ethos',
      'Personalised guest care',
      'Community partnerships',
      'Warm, unhurried service',
    ],
  },
];

export function getAboutStoryById(id: string): AboutStory | undefined {
  return ABOUT_STORIES.find((story) => story.id === id);
}

export function getRelatedAboutStories(id: string): AboutStory[] {
  return ABOUT_STORIES.filter((story) => story.id !== id);
}
