import type { AboutStory } from '../../types/aboutStory';
import type { Accommodation } from '../../types/accommodation';
import type { CuratedEvent } from '../../types/curatedEvent';
import type { CuratedExperience } from '../../types/curatedExperience';
import type { DiningVenue } from '../../types/diningVenue';
import type { GalleryPhoto } from '../../types/galleryPhoto';
import type { SocialLink } from '../../constants/siteSettings';

export interface SiteContent {
  accommodations: Accommodation[];
  experiences: CuratedExperience[];
  events: CuratedEvent[];
  dining: DiningVenue[];
  gallery: GalleryPhoto[];
  about: AboutStory[];
  socialLinks: SocialLink[];
  outdoorDiningLocations: string[];
  source: 'sanity' | 'static';
}
