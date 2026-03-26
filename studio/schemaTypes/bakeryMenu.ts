import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bakeryMenu',
  title: 'Bakery Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'menuPdf',
      title: 'Menu PDF',
      description: 'Upload your current menu as a PDF. Customers will see a download link on the bakery page.',
      type: 'file',
      options: {accept: '.pdf'},
      validation: (R) => R.required(),
    }),
  ],
})
