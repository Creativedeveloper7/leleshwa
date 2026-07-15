import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Leleshwa Getaway',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({ name: 'id', title: 'ID', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'href', title: 'URL', type: 'url', validation: (rule) => rule.required() }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
    defineField({
      name: 'outdoorDiningLocations',
      title: 'Outdoor Dining Locations',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
