import { toTitleCase } from '@mnsart/utils';
import { RiToolsFill } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

export const capabilityType = defineType({
  name: 'capability',
  icon: RiToolsFill,
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
        source: (doc) => `capability-${doc.name}`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      value: 'value',
    },
    prepare({ name, value }) {
      const formatName = name
        ? toTitleCase(name)
        : 'Capability name not provided';

      return {
        title: formatName,
        subtitle: `Value: ${value}`,
        media: RiToolsFill,
      };
    },
  },
});
