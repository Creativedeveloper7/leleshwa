export const SITE_CONTENT_QUERY = `{
  "accommodations": *[_type == "accommodation"] | order(name asc) {
    "id": id.current,
    name,
    tagline,
    heroImage,
    gallery,
    description,
    amenities,
    maxGuests,
    priceFrom
  },
  "experiences": *[_type == "curatedExperience"] | order(name asc) {
    "id": id.current,
    name,
    tagline,
    heroImage,
    gallery,
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
    heroImage,
    gallery,
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
    heroImage,
    viewType,
    menuImages
  },
  "gallery": *[_type == "galleryPhoto"] | order(category asc, alt asc) {
    "id": id.current,
    src,
    alt,
    category
  },
  "about": *[_type == "aboutStory"] | order(name asc) {
    "id": id.current,
    name,
    tagline,
    heroImage,
    gallery,
    description,
    highlights
  },
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0] {
    socialLinks[] { id, label, href },
    outdoorDiningLocations
  }
}`;
