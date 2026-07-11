import type { AboutStory } from '../types/aboutStory';

export const ABOUT_STORIES: AboutStory[] = [
  {
    id: 'our-story',
    name: 'Our Story',
    tagline: 'Born of the land, built for stillness.',
    heroImage: '/images/sunset.png',
    gallery: [
      '/images/sunset.png',
      '/images/villa.png',
      '/images/naturewalk.png',
      '/images/main%20house.png',
    ],
    description:
      'Perched above the rolling landscapes of Silole Sanctuary and Nairobi National Park, Leleshwa Getaway is a hidden retreat where luxury meets the untamed beauty of the wild. Founded in 2010 and named after the iconic Leleshwa tree, our three-acre sanctuary offers a unique blend of countryside charm and refined hospitality — only 25 kilometres from Nairobi\'s bustling city centre. From exquisite dining and breathtaking sunsets to curated family experiences and elegant event spaces, every moment is crafted to reconnect you with nature without leaving comfort behind.',
    highlights: [
      'Founded in 2010',
      'Named after the Leleshwa tree',
      '3-acre sanctuary',
      '25km from Nairobi',
      'Silole Sanctuary & Nairobi National Park',
      'Countryside charm meets refined hospitality',
    ],
  },
  {
    id: 'conservation',
    name: 'Conservation',
    tagline: 'Protecting the wild we share.',
    heroImage: '/images/naturewalk.png',
    gallery: [
      '/images/naturewalk.png',
      '/images/sunset.png',
      '/images/camping.png',
      '/images/archery.png',
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
    heroImage: '/images/main%20house.png',
    gallery: [
      '/images/main%20house.png',
      '/images/rest.png',
      '/images/bar.png',
      '/images/villa.png',
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
