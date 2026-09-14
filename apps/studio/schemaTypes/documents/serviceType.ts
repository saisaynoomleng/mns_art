import { toTitleCase } from '@mnsart/utils';
import { MdOutlineDesignServices } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const serviceType = defineType({
  name: 'service',
  type: 'document',
  icon: MdOutlineDesignServices,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .info(`Service Name is required to generate a page on the website`),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) =>
        rule
          .required()
          .error(`Slug is required to generate a page on the website`),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      const formatName = name ? toTitleCase(name) : 'Service name not provided';

      return {
        title: formatName,
        media: MdOutlineDesignServices,
      };
    },
  },
});
