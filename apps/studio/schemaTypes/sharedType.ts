import { defineArrayMember, defineField, defineType } from 'sanity';
import { toTitleCase } from '@mnsart/utils';

import { RiSeoLine } from 'react-icons/ri';
import { MdAddLink, MdQuestionAnswer } from 'react-icons/md';
import { IoMdImage } from 'react-icons/io';
import { TbColumns } from 'react-icons/tb';

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  type: 'image',
  icon: IoMdImage,
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: (rule) =>
        rule.required().info(`Alternative Text is required for accessibility`),
    }),
  ],
  options: {
    hotspot: true,
  },
});

export const blockContent = defineType({
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'imageWithAlt',
    }),
  ],
});

export const seo = defineType({
  name: 'seo',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      image: 'ogImage',
    },
    prepare({ title, image }) {
      const formatTitle = title ? toTitleCase(title) : '';

      return {
        title: formatTitle,
        media: image ?? RiSeoLine,
      };
    },
  },
});

export const socialLink = defineType({
  name: 'socialLink',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      options: {
        list: [
          { title: 'GitHub', value: 'git-hub' },
          { title: 'LinkedIn', value: 'linked-in' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
        ],
      },
    }),
    defineField({
      name: 'url',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
    },
    prepare({ platform }) {
      const formatPlatform = platform
        ? toTitleCase(platform)
        : 'no platform provided';

      return {
        title: formatPlatform,
        media: MdAddLink,
      };
    },
  },
});

export const faq = defineType({
  name: 'faq',
  icon: MdQuestionAnswer,
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
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      const formatTitle = title ? toTitleCase(title) : 'Question not provided';

      return {
        title: formatTitle,
        media: MdQuestionAnswer,
      };
    },
  },
});

export const navLink = defineType({
  name: 'navLink',
  icon: MdAddLink,
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
    }),
    defineField({
      name: 'href',
      type: 'string',
    }),
    defineField({
      name: 'isButton',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isExternal',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      isButton: 'isButton',
      isExternal: 'isExternal',
    },
    prepare({ label, isButton, isExternal }) {
      const formatLabel = label ? toTitleCase(label) : 'Label not provided';
      const button = !isButton ? 'Link Type' : 'Button Type';
      const external = isExternal ? 'Exteranl Link' : 'Internal Link';

      return {
        title: formatLabel,
        subtitle: `Type: ${button} | Route: ${external}`,
        media: MdAddLink,
      };
    },
  },
});

export const footerColumn = defineType({
  name: 'footerColumn',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'lable',
              type: 'string',
            }),
            defineField({
              name: 'href',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      const formatTitle = title
        ? toTitleCase(title)
        : 'Column title not provided';

      return {
        title: formatTitle,
        media: TbColumns,
      };
    },
  },
});
