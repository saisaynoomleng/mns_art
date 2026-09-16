import { defineQuery } from 'next-sanity';

// =======================
// SEO
// =======================
export const ROOT_LAYOUT_SEO_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "title": seo.metaTitle,
  "description": seo.metaDescription
}`);

export const CONTACT_US_PAGE_SEO_QUERY = defineQuery(`*[_type == 'page'
 && slug.current == 'contact-us-page'
 && type == 'main'][0]{
  "title": seo.metaTitle,
  "description": seo.metaDescription
 }`);
