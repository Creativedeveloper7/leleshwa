/** Resolve image URL from Sanity image asset or legacy string path/URL. */
const imageUrl = (field: string) => `coalesce(${field}.asset->url, ${field})`;

/** Resolve array of image URLs from image assets or legacy string paths. */
const imageUrlArray = (field: string) =>
  `${field}[]{ "url": select(defined(asset) => asset->url, true => @) }.url`;

export const SITE_CONTENT_QUERY = `{
  "accommodations": *[_type == "accommodation"] | order(name asc) {
    "id": id.current,
    name,
    tagline,
    "heroImage": ${imageUrl('heroImage')},
    "gallery": ${imageUrlArray('gallery')},
    description,
    amenities,
    maxGuests,
    priceFrom
  },
  "experiences": *[_type == "curatedExperience"] | order(name asc) {
    "id": id.current,
    name,
    tagline,
    "heroImage": ${imageUrl('heroImage')},
    "gallery": ${imageUrlArray('gallery')},
    description,
    highlights,
    duration,
    maxGuests,
    priceFrom
  },
  "events": *[_type == "curatedEvent"] | order(name asc) {
    "id": id.current,
    name,
    tagline,
    "heroImage": ${imageUrl('heroImage')},
    "gallery": ${imageUrlArray('gallery')},
    description,
    highlights,
    duration,
    maxGuests,
    priceFrom,
    priceUnit
  },
  "dining": *[_type == "diningVenue"] | order(name asc) {
    "id": id.current,
    name,
    tagline,
    "heroImage": ${imageUrl('heroImage')},
    viewType,
    "menuImages": ${imageUrlArray('menuImages')}
  },
  "gallery": *[_type == "galleryPhoto"] | order(category asc, alt asc) {
    "id": id.current,
    "src": ${imageUrl('src')},
    alt,
    category
  },
  "about": *[_type == "aboutStory"] | order(name asc) {
    "id": id.current,
    name,
    tagline,
    "heroImage": ${imageUrl('heroImage')},
    "gallery": ${imageUrlArray('gallery')},
    description,
    highlights
  },
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0] {
    socialLinks[] { id, label, href },
    outdoorDiningLocations
  }
}`;
