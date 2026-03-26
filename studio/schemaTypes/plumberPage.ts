import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'plumberPage',
  title: 'Plumber Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hours',
      title: 'Business Hours',
      description: 'Set your hours for each day. Toggle "Closed" for days you are not open.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dayHours',
          title: 'Day',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              },
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'closed',
              title: 'Closed this day?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'open',
              title: 'Opening Time (e.g. 7:00 AM)',
              type: 'string',
            }),
            defineField({
              name: 'close',
              title: 'Closing Time (e.g. 5:00 PM)',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'day', closed: 'closed', open: 'open', close: 'close'},
            prepare({title, closed, open, close}: {title: string; closed: boolean; open: string; close: string}) {
              return {
                title,
                subtitle: closed ? 'Closed' : `${open || '?'} – ${close || '?'}`,
              }
            },
          },
        },
      ],
    }),
  ],
})
