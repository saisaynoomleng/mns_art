import { MdOutlineSettings } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const siteSetting = defineType({
  name: 'siteSetting',
  type: 'document',
  icon: MdOutlineSettings,
  groups: [
    { title: 'Branding', name: 'branding' },
    { title: 'Navigation', name: 'nav' },
    { title: 'Footer', name: 'footer' },
  ],
  fields: [
    // branding
    defineField({
      name: 'siteName',
      type: 'string',
      validation: (rule) => rule.required().info(`Site Name is required`),
      group: 'branding',
    }),
    defineField({
      name: 'primaryLogo',
      type: 'imageWithAlt',
      validation: (rule) =>
        rule.required().error(`Logo is required for the website`),
      group: 'branding',
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [{ type: 'socialLink' }],
      group: 'branding',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      validation: (rule) =>
        rule.required().info(`SEO helps the Google Crawler`),
      group: 'branding',
    }),

    // Navigation
    defineField({
      name: 'navLinks',
      type: 'array',
      of: [{ type: 'navLink' }],
      validation: (rule) =>
        rule.required().info(`Navigation Links are required for the Main Menu`),
      group: 'nav',
    }),

    // footer
    defineField({
      name: 'footerColumns',
      type: 'array',
      of: [{ type: 'footerColumn' }],
      group: 'footer',
    }),
    defineField({
      name: 'footerText',
      type: 'text',
      description: 'Footer text to display under the Logo in the Footer Menu',
      group: 'footer',
    }),
    defineField({
      name: 'contactInfo',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          type: 'string',
        }),
        defineField({
          name: 'zip',
          type: 'string',
        }),
        defineField({
          name: 'city',
          type: 'string',
        }),
        defineField({
          name: 'state',
          type: 'string',
        }),
        defineField({
          name: 'country',
          type: 'string',
        }),
        defineField({
          name: 'email',
          type: 'email',
        }),
      ],
    }),
  ],
});
