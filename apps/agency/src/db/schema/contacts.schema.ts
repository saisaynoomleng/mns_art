import * as t from 'drizzle-orm/pg-core';
import { contactService, contactStatus, timestamps } from './schema-helper';

export const ContactTable = t.pgTable('contacts', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  message: t.text('message').notNull(),
  minBudget: t.integer('min_budget').notNull(),
  maxBudget: t.integer('max_budget').notNull(),
  service: contactService('service').notNull(),
  status: contactStatus('status').notNull().default('new'),
  ...timestamps,
});
