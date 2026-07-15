import { defineField, defineType } from 'sanity';

export const galleryPhoto = defineType({
  name: 'galleryPhoto',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'src',
      title: 'Image URL',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Outside view', value: 'outside-view' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Bar', value: 'bar' },
          { title: 'Culinary', value: 'culinary' },
          { title: 'Events', value: 'events' },
          { title: 'Experiences', value: 'experiences' },
          { title: 'Accommodations', value: 'accommodations' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'alt', subtitle: 'category' },
  },
});
