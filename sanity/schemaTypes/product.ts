import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Kalaspaket',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Namn',
      type: 'string',
      description: 'T.ex. "Piratkalaset"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Tema',
      type: 'string',
      description: 'T.ex. "Pirat", "Safari", "Superhjälte"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ageGroup',
      title: 'Åldersgrupp',
      type: 'string',
      options: {
        list: [
          { title: '4–6 år', value: '4-6' },
          { title: '7–8 år', value: '7-8' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beskrivning',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Pris (kr)',
      type: 'number',
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Ordinarie pris (kr)',
      type: 'number',
      description: 'Fyll i om produkten är nedsatt',
    }),
    defineField({
      name: 'image',
      title: 'Produktbild',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'isNew',
      title: 'Nyhet',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isPopular',
      title: 'Populär',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'downloadContents',
      title: 'Nedladdningsinnehåll',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista vad paketet innehåller, t.ex. "20 lekar", "Inbjudningar"',
    }),
    defineField({
      name: 'order',
      title: 'Sorteringsordning',
      type: 'number',
      description: 'Lägre siffra = visas först',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'ageGroup',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === '4-6' ? '4–6 år' : '7–8 år',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Sorteringsordning',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
