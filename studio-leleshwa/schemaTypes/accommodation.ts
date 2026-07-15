import { defineArrayMember, defineField, defineType } from 'sanity';

export const accommodation = defineType({
  name: 'accommodation',
  title: 'Accommodation',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      description: 'Stable URL/id used by the website (e.g. luxury-suites)',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'text', rows: 2 }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image URL',
      type: 'string',
      description: 'Public path or absolute URL, e.g. /images/villa.png',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5 }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'maxGuests', title: 'Max Guests', type: 'number', validation: (rule) => rule.min(1) }),
    defineField({ name: 'priceFrom', title: 'Price From (KES)', type: 'number', validation: (rule) => rule.min(0) }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline' },
  },
});
