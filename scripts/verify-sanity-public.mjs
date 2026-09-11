const projectId = 'th48chxn';
const dataset = 'production';

const countsQuery = `{
  "acc": count(*[_type == "accommodation"]),
  "exp": count(*[_type == "curatedExperience"]),
  "evt": count(*[_type == "curatedEvent"]),
  "din": count(*[_type == "diningVenue"]),
  "gal": count(*[_type == "galleryPhoto"]),
  "abt": count(*[_type == "aboutStory"]),
  "settings": count(*[_type == "siteSettings"]),
  "sample": *[_type == "accommodation"] | order(name asc) [0...3] {
    _id,
    "slug": id.current,
    name
  }
}`;

const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${encodeURIComponent(countsQuery)}`;
const res = await fetch(url);
const data = await res.json();
console.log(JSON.stringify(data, null, 2));
if (!data.result?.acc) {
  console.error('Public accommodations not readable');
  process.exit(1);
}
