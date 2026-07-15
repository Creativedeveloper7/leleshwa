import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('accommodation').title('Accommodations'),
      S.documentTypeListItem('curatedExperience').title('Experiences'),
      S.documentTypeListItem('diningVenue').title('Dining'),
      S.documentTypeListItem('galleryPhoto').title('Gallery'),
      S.documentTypeListItem('curatedEvent').title('Events'),
      S.documentTypeListItem('aboutStory').title('About'),
    ]);
