import { formatDateUS, toTitleCase } from '@mnsart/utils';
import { BsFillSuitcaseLgFill } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  icon: BsFillSuitcaseLgFill,
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
        source: 'name',
      },
      validation: (rule) =>
        rule
          .required()
          .error(`Slug is required to generate a page on the website`),
    }),
    defineField({
      name: 'type',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mainImage',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startedAt',
      type: 'date',
      validation: (rule) =>
        rule.required().info(`Project Started Date is required`),
    }),
    defineField({
      name: 'endedAt',
      type: 'date',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      validation: (rule) => rule.required(),
      description: 'Project Summary',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      description: 'Project Detail',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      validation: (rule) =>
        rule.required().info(`SEO is required for Google Web Crawler`),
    }),
    defineField({
      name: 'previewUrl',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImage',
      startedAt: 'startedAt',
    },
    prepare({ name, image, startedAt }) {
      const formatName = name ? toTitleCase(name) : 'Project name not provided';
      const formatDate = startedAt
        ? formatDateUS(startedAt)
        : 'Started date not specified';

      return {
        title: formatName,
        subtitle: `Started Date: ${formatDate}`,
        media: image ?? BsFillSuitcaseLgFill,
      };
    },
  },
});
