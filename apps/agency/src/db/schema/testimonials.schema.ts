import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema';
import { testimonialStatus, timestamps } from './schema-helper';
import { sql } from 'drizzle-orm';

export const TestimonialTable = t.pgTable(
  'testimonials',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'set null' }),
    rating: t.integer('rating').notNull().default(5),
    title: t.varchar('title', { length: 255 }),
    body: t.text('body'),
    status: testimonialStatus('status').notNull().default('new'),
    ...timestamps,
  },
  (table) => [
    t.index('testimonial_userId_idx').on(table.userId),
    t.check('rating_check', sql`${table.rating} BETWEEN 1 AND 5`),
  ],
);
