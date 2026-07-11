export type GalleryCategory =
  | 'outside-view'
  | 'restaurant'
  | 'bar'
  | 'culinary'
  | 'events'
  | 'experiences'
  | 'accommodations';

export type GalleryFilterId = GalleryCategory | 'all';

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}
