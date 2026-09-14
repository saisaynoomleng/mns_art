import {
  blockContent,
  faq,
  footerColumn,
  imageWithAlt,
  navLink,
  seo,
  socialLink,
} from './sharedType';
import { siteSetting } from './singletons/site-setting';

export const schemaTypes = [
  // shared Types
  imageWithAlt,
  blockContent,
  seo,
  socialLink,
  faq,
  navLink,
  footerColumn,

  // Singletons
  siteSetting,

  // Documents
];
