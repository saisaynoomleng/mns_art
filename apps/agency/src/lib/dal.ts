'use server';

import { sanityFetch } from '@/sanity/live';
import { ROOT_LAYOUT_SEO_QUERY } from '@/sanity/query';

export const getRootSEO = async () => {
  const { data: seo } = await sanityFetch({
    query: ROOT_LAYOUT_SEO_QUERY,
    perspective: 'published',
    stega: false,
  });

  return seo;
};
