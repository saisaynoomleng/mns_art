import * as t from 'drizzle-orm/pg-core';
import { timestamps, userRole } from './schema-helper';

export const UserTable = t.pgTable('users', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  companyName: t.varchar('company_name', { length: 255 }),
  position: t.varchar('position', { length: 255 }),
  emailVerified: t.boolean('email_verified').default(false).notNull(),
  imageUrl: t.varchar('image_url', { length: 255 }),
  role: userRole('role').default('user').notNull(),
  banned: t.boolean('banned').default(false),
  banReason: t.text('ban_reason'),
  banExpires: t.timestamp('ban_expires', { withTimezone: true }),
  isDeleted: t.boolean('is_deleted').notNull().default(false),
  deletedAt: t.timestamp('deleted_at', { withTimezone: true }),
  ...timestamps,
});
