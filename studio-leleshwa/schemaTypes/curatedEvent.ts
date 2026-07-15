import { defineArrayMember, defineField, defineType } from 'sanity';

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
    defineField({
      name: 'heroImage',
      title: 'Hero Image URL',
      type: 'string',
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
    select: { title: 'name', subtitle: 'priceUnit' },
  },
});
