import { PasswordRule } from './types';

export const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
  'image/avif',
  'image/svg',
  'image/gif',
];

export const PasswordRules: PasswordRule[] = [
  {
    id: 'minLength',
    label: 'At least 8 characters',
    test: (v) => v.length >= 8,
  },
  {
    id: 'upper',
    label: 'At least one uppercase letter',
    test: (v) => /[A-Z]/.test(v),
  },
  {
    id: 'lower',
    label: 'At least one lowercase letter',
    test: (v) => /[a-z]/.test(v),
  },
  {
    id: 'number',
    label: 'At least one number character',
    test: (v) => /[0-9]/.test(v),
  },
  {
    id: 'special',
    label: 'At least one special character',
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];
