import db from '@/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { env } from './env/server';
import {
  AccountTable,
  SessionTable,
  UserTable,
  VerificationTable,
} from '@/db/schema';
import { admin, emailOTP } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  plugins: [
    admin(),
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        if (type === 'forget-password') {
          // send forget password otp
        } else if (type === 'change-email') {
          // send change email otp
        }
      },
      sendVerificationOnSignUp: true,
      overrideDefaultEmailVerification: true,
      otpLength: 6,
      expiresIn: 60 * 5,
      changeEmail: {
        enabled: true,
      },
    }),
    nextCookies(),
  ],

  appName: 'MNS Art',

  baseURL: env.BETTER_AUTH_URL,

  trustedOrigins: ['http://localhost:3000', env.BETTER_AUTH_URL],

  secret: env.BETTER_AUTH_SECRET,

  user: {
    modelName: 'users',
    fields: {
      name: 'name',
      email: 'email',
    },
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,

      sendDeleteAccountVerification: async ({ user, url }) => {},

      beforeDelete: async (user) => {},

      afterDelete: async (user) => {},
    },
  },

  session: {
    modelName: 'sessions',
    fields: {
      userId: 'userId',
    },
    cookieCache: {
      enabled: true,
      maxAge: 60 * 3,
    },
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  account: {
    modelName: 'accounts',
    fields: {
      userId: 'userId',
    },
    encryptOAuthTokens: true,
    storeStateStrategy: 'database',
    storeAccountCookie: true,
  },

  verification: {
    modelName: 'verifications',
  },

  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      users: UserTable,
      sessions: SessionTable,
      accounts: AccountTable,
      verifications: VerificationTable,
    },
  }),

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 15,

    sendVerificationEmail: async ({ user, url }) => {},
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    resetPasswordTokenExpiresIn: 60 * 15,
    revokeSessionsOnPasswordReset: true,
  },

  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  advanced: {
    useSecureCookies: true,
    database: {
      generateId: 'uuid',
    },
  },

  logger: {
    disabled: false,
    disableColors: false,
    level: 'warn',
    log: (level) => {
      console.log(level);
    },
  },
});
