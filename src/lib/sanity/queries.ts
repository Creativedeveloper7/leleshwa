/**
 * Resolve a usable image URL from either:
 * - a Sanity image asset, or
 * - a legacy string path/URL left over from seeding
 * Never return a raw image object (that breaks the website mapper).
 *
 * Note: GROQ has no type() helper — detect strings by absence of object keys.
 */
const imageUrl = (field: string) =>
  `select(
    defined(${field}.asset->url) => ${field}.asset->url,
    defined(${field}) && !defined(${field}._type) && !defined(${field}.asset) => ${field},
    true => null
  )`;

const imageUrlArray = (field: string) =>
  `coalesce(
    ${field}[]{
      "url": select(
        defined(asset->url) => asset->url,
        defined(@) && !defined(_type) && !defined(asset) => @,
        true => null
      )
    }.url[defined(@)],
    []
  )`;

export const SITE_CONTENT_QUERY = `{
  "accommodations": *[_type == "accommodation"] | order(name asc) {
    "id": coalesce(id.current, _id),
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
    "id": coalesce(id.current, _id),
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
    "id": coalesce(id.current, _id),
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
    "id": coalesce(id.current, _id),
    name,
    tagline,
    "heroImage": ${imageUrl('heroImage')},
    viewType,
    "menuImages": ${imageUrlArray('menuImages')}
  },
  "gallery": *[_type == "galleryPhoto"] | order(category asc, alt asc) {
    "id": coalesce(id.current, _id),
    "src": ${imageUrl('src')},
    alt,
    category
  },
  "about": *[_type == "aboutStory"] | order(name asc) {
    "id": coalesce(id.current, _id),
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
