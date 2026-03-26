import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'salonPage',
  title: 'Salon Page',
  type: 'document',
  fields: [
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      description: 'Up to 5 photos shown in the gallery section',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          title: 'Gallery Image',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'alt', media: 'image'},
          },
        },
      ],
      validation: (R) => R.max(5),
    }),
  ],
})
