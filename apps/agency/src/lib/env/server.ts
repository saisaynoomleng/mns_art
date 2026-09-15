import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    SANITY_READ_TOKEN: z
      .string()
      .min(1, 'Sanity Read Token must have at least 1 character'),
    SANITY_WRITE_TOKEN: z
      .string()
      .min(1, 'Sanity Write token must have at least 1 character'),
    SANITY_STUDIO_DATASET: z
      .enum(['production', 'development'])
      .default('production'),
    SANITY_STUDIO_PROJECT_ID: z
      .string()
      .min(1, 'Snaity Studio Project ID must have at least 1 character'),

    DATABASE_URL: z.string().startsWith('postgresql://'),

    BETTER_AUTH_SECRET: z
      .string()
      .min(1, 'Better Auth Screct must have at least 1 character'),
    BETTER_AUTH_URL: z
      .url('Must be a valid URL')
      .min(1, 'Better Auth URL required at least 1 character'),
    GITHUB_CLIENT_ID: z
      .string()
      .min(1, 'GITHUB Client ID must have at least 1 character'),
    GITHUB_CLIENT_SECRET: z
      .string()
      .min(1, 'GITHUB Client Secret must have at least 1 character'),
    GOOGLE_CLIENT_ID: z
      .string()
      .min(1, 'Google Client ID must have at least 1 character'),
    GOOGLE_CLIENT_SECRET: z
      .string()
      .min(1, 'Google Client Secret must have at least 1 character'),
  },
  runtimeEnv: {
    SANITY_READ_TOKEN: process.env.SANITY_READ_TOKEN,
    SANITY_WRITE_TOKEN: process.env.SANITY_WRITE_TOKEN,
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,

    DATABASE_URL: process.env.DATABASE_URL,

    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  skipValidation: !!process.env.SKIP_VALIDATION,
});
