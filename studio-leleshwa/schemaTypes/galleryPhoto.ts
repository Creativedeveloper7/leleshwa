import { defineField, defineType } from 'sanity';
import { previewWithImage } from './preview';

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
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
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
  preview: previewWithImage({ title: 'alt', subtitle: 'category', media: 'src' }),
});
