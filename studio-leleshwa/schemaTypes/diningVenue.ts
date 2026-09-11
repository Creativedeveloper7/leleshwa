import { defineArrayMember, defineField, defineType } from 'sanity';
import { previewWithImage } from './preview';

export const diningVenue = defineType({
  name: 'diningVenue',
  title: 'Dining Venue',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      description: 'Click Generate after setting the name.',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'text', rows: 2 }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
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
      hidden: ({ parent }) => parent?.viewType !== 'menu',
    }),
  ],
  preview: previewWithImage({ title: 'name', subtitle: 'viewType', media: 'heroImage' }),
});
