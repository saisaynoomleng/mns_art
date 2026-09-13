import { expect, describe, it } from 'vitest';
import {
  formatDateUS,
  formatImageSize,
  getFormattedYear,
  getImageExtension,
  isImageTooLarge,
  replaceDash,
  replaceSpaceWithUnderscore,
  slugify,
  toTitleCase,
} from '../src';

describe('toTitleCase', () => {
  it('should convert a string to title case', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
    expect(toTitleCase('hello                 world')).toBe('Hello World');
    expect(
      toTitleCase('            hello                 world          '),
    ).toBe('Hello World');
  });
});

describe('replaceDash', () => {
  it('should replace dashes with space', () => {
    expect(replaceDash('foo-bar')).toBe('foo bar');
  });
  it('should replace dashes with no space', () => {
    expect(replaceDash('foo-bar', '')).toBe('foobar');
  });
});

describe('slugify', () => {
  it('should convert a string into URL-friendly slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('Hell0$ %WoRld')).toBe('hell0-world');
  });
});

describe('replace space with underscore', () => {
  it('should replace any whitespaces with underscore', () => {
    expect(replaceSpaceWithUnderscore('hello world')).toBe('hello_world');
  });
});

describe('formatDate', () => {
  it('should format a date in US Format', () => {
    expect(formatDateUS('09-24-1996')).toBe('Sep 24, 1996');
    expect(formatDateUS('2020 11 23')).toBe('Nov 23, 2020');
  });
});

describe('getFormattedYear', () => {
  it('should get the full year', () => {
    expect(getFormattedYear('09-24-1996')).toBe('1996');
  });
});

describe('check image size', () => {
  it('should check whether the image is too large', () => {
    expect(isImageTooLarge(1024)).toBe(false);
    expect(isImageTooLarge(1024 * 1024 * 1024)).toBe(true);
    expect(isImageTooLarge(1024 * 1025)).toBe(true);
  });
});

describe('get image extension', () => {
  it('should extract the image extension from mime types', () => {
    expect(getImageExtension('image/jpeg')).toBe('JPEG');
    expect(getImageExtension('image/avif')).toBe('AVIF');
    expect(getImageExtension('jpeg')).toBe('');
  });
});

describe('format image size', () => {
  it('should format the byte into string', () => {
    expect(formatImageSize(1000000)).toBe('976.56 KB');
    expect(formatImageSize(1000000000)).toBe('953.67 MB');
  });
});
