import { defineArrayMember, defineField, defineType } from 'sanity';

const imageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
      }),
    ],
    validation: (rule) => rule.required(),
  });

const imageGalleryField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({
            name: 'alt',
            title: 'Alt text',
            type: 'string',
          }),
        ],
      }),
    ],
    options: { layout: 'grid' },
  });

export const curatedEvent = defineType({
  name: 'curatedEvent',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'text', rows: 2 }),
    imageField('heroImage', 'Hero Image'),
    imageGalleryField('gallery', 'Gallery'),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5 }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
    defineField({ name: 'maxGuests', title: 'Max Guests', type: 'number', validation: (rule) => rule.min(1) }),
    defineField({ name: 'priceFrom', title: 'Price From (KES)', type: 'number', validation: (rule) => rule.min(0) }),
    defineField({
      name: 'priceUnit',
      title: 'Price Unit',
      type: 'string',
      description: 'e.g. per day, per event',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'priceUnit', media: 'heroImage' },
  },
});
