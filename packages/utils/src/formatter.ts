/**
 * Helper Functions
 */

/**
 * Converts a string to Title Case
 * @param title string
 * @returns string
 * @example toTitleCase('the great gatsby') // 'The Great Gatsby'
 */
export const toTitleCase = (title: string): string => {
  return title
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Replace dashes in a string with a given replacement(space by default)
 * @param input string
 * @returns string
 * @example replaceDash('foo-bar') // 'foo bar'
 * @example replaceDash('foo-bar', '') // 'foobar'
 */
export const replaceDash = (input: string, replacement = ' '): string => {
  return input.replace(/-/g, replacement);
};

/**
 * Convert a string into URL-friendly slug
 * @param input string
 * @returns string
 * @example slugify('Hello World') // 'hello-world'
 */
export const slugify = (input: string): string => {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 200);
};

/**
 * Collapses whitespace and replaces it with a single underscore.
 * @param input string
 * @returns string
 * @example replaceSpaceWithUnderscore('hello world') // 'hello_world'
 */
export const replaceSpaceWithUnderscore = (input: string): string => {
  return input.replace(/\s+/g, '_');
};

/**
 * Date Formatting
 */

/**
 * Format a Date in US format
 * @param date string | Date
 * @returns string
 */
export const formatDateUS = (date: string | Date): string => {
  const parsedDate = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'short',
  }).format(parsedDate);
};

/**
 * Return Year of the Date
 * @param date string | Date
 * @returns string
 */
export const getFormattedYear = (date: string | Date): string => {
  const parsedDate = new Date(date);

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
  }).format(parsedDate);
};

/**
 * Image helpers
 */

/**
 * Check whether an image is larger than 1MB
 * @param size number
 * @returns boolean
 */
export const isImageTooLarge = (size: number): boolean => size > 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
  'image/avif',
  'image/svg',
  'image/gif',
];

/**
 * Extract image file extension from MIME type
 * @param type string
 * @returns string
 */
export const getImageExtension = (type: string) => {
  const [, ext] = type.split('/');

  return ext?.toUpperCase() ?? '';
};

/**
 * Format byte count into readable string
 * @param size number
 * @returns string
 */
export const formatImageSize = (size: number): string => {
  if (size >= 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }

  if (size >= 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  }

  return `${size} B`;
};
