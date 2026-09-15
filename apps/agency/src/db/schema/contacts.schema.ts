import * as t from 'drizzle-orm/pg-core';

export const ContactTable = t.pgTable('contacts', {
  id: t.uuid('id').primaryKey().defaultRandom(),
});
