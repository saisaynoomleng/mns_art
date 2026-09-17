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

// =======================
// Data
// =======================
export const NAV_LINKS_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  navLinks[]{
    _key,
    label,
    isButton,
    isExternal,
    href
  }
}`);

export const COMPANY_PAGE_QUERY = defineQuery(`*[_type == 'page'
 && defined(slug.current)
 && type == 'utility'
 && slug.current == $slug][0]{
  body,
  "slug": slug.current,
  "seoTitle": seo.metaTitle,
  "seoDescription": seo.metaDescription
 }`);

export const ALL_COMPANY_PAGES = defineQuery(`*[_type == 'page'
 && defined(slug.current)
 && type == 'utility'
 ]{
  "slug": slug.current,
 }`);

export const FOOTER_QUERY = defineQuery(`*[_type == 'siteSetting'][0]{
  "columns": footerColumns[]{
    _key,
    links[]{
      _key,
      href,
      label
    },
    title
  },
  "text": footerText,
  "street": contactInfo.street,
  "city": contactInfo.city,
  "state": contactInfo.state,
  "country": contactInfo.country,
  "zip": contactInfo.zip,
}`);

export const ALL_PRICING_QUERY = defineQuery(`{
  "pricing": *[_type == 'carePlan'
              && defined(slug.current)]
              | order(isPremium asc){
                _id,
                name,
                "slug": slug.current,
                excerpt,
                pricePerMonth,
                "inclusives": inclusive[]{
                  _key,
                  title
                },
                "exclusives": exclusive[],
                isPremium,
              },
  "seo": *[_type == 'page'
          && slug.current == 'pricing-page'
          && type == 'main'][0]{
            "title": seo.metaTitle,
            "description": seo.metaDescription
          }
}`);
