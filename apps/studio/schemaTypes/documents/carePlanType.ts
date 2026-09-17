import { formatPriceInUSD, toTitleCase } from '@mnsart/utils';
import { TfiSupport } from 'react-icons/tfi';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const carePlanType = defineType({
  name: 'carePlan',
  icon: TfiSupport,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `careplan-${doc.name}`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
    }),
    defineField({
      name: 'pricePerMonth',
      type: 'number',
      validation: (rule) => rule.greaterThan(0),
    }),
    defineField({
      name: 'inclusive',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'body',
              type: 'text',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'exclusive',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isPremium',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      price: 'pricePerMonth',
    },
    prepare({ name, price }) {
      const formatName = name ? toTitleCase(name) : 'Plan name not provided';
      const formatPrice = price
        ? formatPriceInUSD(price)
        : 'Price not provided';

      return {
        title: formatName,
        subtitle: `Price: ${formatPrice}/month`,
        media: TfiSupport,
      };
    },
  },
});
