import { capabilityType } from './documents/capabilityType';
import { carePlanType } from './documents/carePlanType';
import { faqsType } from './documents/faqsType';
import { pageType } from './documents/pageType';
import { projectType } from './documents/projectType';
import { serviceType } from './documents/serviceType';
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
  serviceType,
  projectType,
  faqsType,
  capabilityType,
  pageType,
  carePlanType,
];
