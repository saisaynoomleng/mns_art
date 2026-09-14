import { toTitleCase } from '@mnsart/utils';
import { PiTextAlignJustifyFill } from 'react-icons/pi';
import { defineField, defineType } from 'sanity';

export const pageType = defineType({
  name: 'page',
  icon: PiTextAlignJustifyFill,
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
        source: (doc) => `${doc.name}`,
      },
      validation: (rule) =>
        rule
          .required()
          .info(`Slug is required to generate a page on the website`),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Main Page', value: 'main' },
          { title: 'Utility Page', value: 'utility' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      hidden: ({ document }) => document?.type !== 'utility',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
    },
    prepare({ name, type }) {
      const formatName = name ? toTitleCase(name) : 'Page name not provided';
      const formatType = type ? toTitleCase(type) : 'Page type not provided';

      return {
        title: formatName,
        subtitle: `Page Type: ${formatType}`,
        media: PiTextAlignJustifyFill,
      };
    },
  },
});
