import { defineArrayMember, defineField, defineType } from 'sanity';

export const diningVenue = defineType({
  name: 'diningVenue',
  title: 'Dining Venue',
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
      name: 'viewType',
      title: 'View Type',
      type: 'string',
      options: {
        list: [
          { title: 'Menu slideshow', value: 'menu' },
          { title: 'Outdoor dining form', value: 'form' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menuImages',
      title: 'Menu Images',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      hidden: ({ parent }) => parent?.viewType !== 'menu',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'viewType' },
  },
});
