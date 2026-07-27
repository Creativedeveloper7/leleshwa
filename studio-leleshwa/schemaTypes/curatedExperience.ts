import { defineArrayMember, defineField, defineType } from 'sanity';
import { previewWithImage } from './preview';

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

export const curatedExperience = defineType({
  name: 'curatedExperience',
  title: 'Experience',
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
  ],
  preview: previewWithImage({ title: 'name', subtitle: 'duration', media: 'heroImage' }),
});
