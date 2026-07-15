import { ABOUT_STORIES } from '../../constants/aboutStories';
import { ACCOMMODATIONS } from '../../constants/accommodations';
import { CURATED_EVENTS } from '../../constants/curatedEvents';
import { CURATED_EXPERIENCES } from '../../constants/curatedExperiences';
import { DINING_VENUES, OUTDOOR_DINING_LOCATIONS } from '../../constants/diningVenues';
import { GALLERY_PHOTOS } from '../../constants/galleryPhotos';
import { SOCIAL_LINKS } from '../../constants/siteSettings';
import type { SiteContent } from './types';

export const STATIC_SITE_CONTENT: SiteContent = {
  accommodations: ACCOMMODATIONS,
  experiences: CURATED_EXPERIENCES,
  events: CURATED_EVENTS,
  dining: DINING_VENUES,
  gallery: GALLERY_PHOTOS,
  about: ABOUT_STORIES,
  socialLinks: SOCIAL_LINKS,
  outdoorDiningLocations: OUTDOOR_DINING_LOCATIONS,
  source: 'static',
};
