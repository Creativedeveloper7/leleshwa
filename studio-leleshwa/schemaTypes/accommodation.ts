import { defineArrayMember, defineField, defineType } from 'sanity';
import { previewWithImage } from './preview';

const imageField = (name: string, title: string, required = true) =>
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
        description: 'Describe the image for accessibility and SEO.',
      }),
    ],
    validation: required ? (rule) => rule.required() : undefined,
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

export const accommodation = defineType({
  name: 'accommodation',
  title: 'Accommodation',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'slug',
      description: 'Stable URL/id used by the website (e.g. luxury-suites). Click Generate after setting the name.',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'text', rows: 2 }),
    imageField('heroImage', 'Hero Image'),
    imageGalleryField('gallery', 'Gallery'),
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
  preview: previewWithImage({ title: 'name', subtitle: 'tagline', media: 'heroImage' }),
});
