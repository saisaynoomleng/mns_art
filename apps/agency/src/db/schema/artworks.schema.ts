import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema';
import { artworkStatus, timestamps } from './schema-helper';

export const ArtworkTable = t.pgTable(
  'artworks',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'set null' }),
    startedAt: t.timestamp('started_at', { withTimezone: true }).notNull(),
    endedAt: t.timestamp('ended_at', { withTimezone: true }),
    status: artworkStatus('status').notNull().default('on_call'),
    imageUrl: t.varchar('image_url', { length: 255 }),
    previewUrl: t.varchar('preview_url', { length: 255 }).notNull(),
    isFinished: t.boolean('is_finished').notNull().default(false),
    ...timestamps,
  },
  (table) => [t.index('artwork_userId_idx').on(table.userId)],
);
