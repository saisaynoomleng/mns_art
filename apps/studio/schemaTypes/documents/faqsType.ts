import { toTitleCase } from '@mnsart/utils';
import { MdQuestionAnswer } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const faqsType = defineType({
  name: 'faqs',
  icon: MdQuestionAnswer,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (rule) =>
        rule
          .required()
          .info(`Slug is required to generate a page on the website`),
      options: {
        source: (doc) => `faq-${doc.name}`,
      },
    }),
    defineField({
      name: 'stage',
      type: 'number',
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      of: [{ type: 'faq' }],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      stage: 'stage',
    },
    prepare({ name, stage }) {
      const formatName = name ? toTitleCase(name) : 'Stage Name not provided';

      return {
        title: formatName,
        subtitle: `Stage: ${stage}`,
        media: MdQuestionAnswer,
      };
    },
  },
});
