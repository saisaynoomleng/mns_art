import { defineQuery } from 'next-sanity';

export const ROOT_LAYOUT_SEO_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "title": seo.metaTitle,
  "description": seo.metaDescription
}`);
