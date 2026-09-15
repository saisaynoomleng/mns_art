import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema';
import { timestamps } from './schema-helper';

export const SessionTable = t.pgTable(
  'sessions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    token: t.text('token').notNull().unique(),
    expiresAt: t.timestamp('expires_at', { withTimezone: true }).notNull(),
    ipAddress: t.text('ip_address'),
    userAgent: t.text('user_agent'),
    impersonatedBy: t.text('impersonated_by'),
    ...timestamps,
  },
  (table) => [t.index('sessions_userId_idx').on(table.userId)],
);
