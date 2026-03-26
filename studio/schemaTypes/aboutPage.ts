import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // Hero
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 4,
    }),
    // Why section
    defineField({
      name: 'whyTitle',
      title: '"Why We Do This" Title',
      type: 'string',
    }),
    defineField({
      name: 'whyBody',
      title: '"Why We Do This" Body Paragraphs',
      description: 'Each item is one paragraph. Add up to 3.',
      type: 'array',
      of: [{type: 'text'}],
    }),
    // How section
    defineField({
      name: 'howTitle',
      title: '"How It Works" Title',
      type: 'string',
    }),
    defineField({
      name: 'howBody',
      title: '"How It Works" Body',
      type: 'text',
      rows: 4,
    }),
    // Team section
    defineField({
      name: 'teamTitle',
      title: 'Team Section Title',
      type: 'string',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teamMember',
          title: 'Team Member',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'bio',
              title: 'Bio',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'title', media: 'photo'},
          },
        },
      ],
      validation: (R) => R.max(4),
    }),
    // CTA section
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
    }),
  ],
})
