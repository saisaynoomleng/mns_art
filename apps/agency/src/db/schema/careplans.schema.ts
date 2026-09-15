import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper';

export const CarePlanTable = t.pgTable('care_plans', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
  pricePerMonthInCents: t.integer('price_per_month_in_cents').notNull(),
  ...timestamps,
});
