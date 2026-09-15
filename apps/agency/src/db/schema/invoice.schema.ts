import * as t from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { UserTable } from './users.schema';
import { UserCarePlanTable } from './user-care-plan.schema';
import { ArtworkTable } from './artworks.schema';
import { invoiceSourceType, invoiceStatus, timestamps } from './schema-helper';

export const InvoiceTable = t.pgTable(
  'invoices',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'restrict' })
      .notNull(),
    userCarePlanId: t
      .uuid('user_care_plan_id')
      .references(() => UserCarePlanTable.id, { onDelete: 'restrict' }),
    artworkId: t
      .uuid('artwork_id')
      .references(() => ArtworkTable.id, { onDelete: 'restrict' }),
    sourceType: invoiceSourceType('source_type').notNull(),
    status: invoiceStatus('status').notNull().default('draft'),
    subtotalSnapshot: t.integer('subtotal_snapshot').notNull(),
    totalSnapshot: t.integer('total_snapshot').notNull(),
    currency: t.varchar('currency', { length: 3 }).notNull().default('USD'),
    stripeInvoiceId: t.varchar('stripe_invoice_id', { length: 255 }).unique(),
    stripePaymentIntentId: t
      .varchar('stripe_payment_intent_id', { length: 255 })
      .unique(),
    dueAt: t.timestamp('due_at', { withTimezone: true }),
    paidAt: t.timestamp('paid_at', { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    t.index('invoice_userId_idx').on(table.userId),
    t.index('invoice_careplanId_idx').on(table.userCarePlanId),
    t.index('invoice_artworkId_idx').on(table.artworkId),
    t.check('check_subtotal', sql`${table.subtotalSnapshot} >= 0`),
    t.check('check_total', sql`${table.totalSnapshot} >= 0`),
    t.check(
      'check_exactly_one_source',
      sql`(${table.userCarePlanId} IS NOT NULL)::int + (${table.artworkId} IS NOT NULL)::int = 1`,
    ),
  ],
);
