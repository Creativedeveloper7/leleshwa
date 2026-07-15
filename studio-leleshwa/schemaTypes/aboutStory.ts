import { defineArrayMember, defineField, defineType } from 'sanity';

export const aboutStory = defineType({
  name: 'aboutStory',
  title: 'About Story',
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
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline' },
  },
});
