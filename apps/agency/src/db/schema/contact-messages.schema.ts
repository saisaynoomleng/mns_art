import * as t from 'drizzle-orm/pg-core';
import { ContactTable } from './contacts.schema';
import { contactMessageDirection, timestamps } from './schema-helper';

export const ContactMessageTable = t.pgTable(
  'contact_messages',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    contactId: t
      .uuid('contact_id')
      .references(() => ContactTable.id, { onDelete: 'cascade' })
      .notNull(),
    message: t.text('message').notNull(),
    direction: contactMessageDirection('direction')
      .notNull()
      .default('outbound'),
    ...timestamps,
  },
  (table) => [t.index('message_contactId_idx').on(table.contactId)],
);
