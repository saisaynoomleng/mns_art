import * as t from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { UserTable } from './users.schema';
import { CarePlanTable } from './careplans.schema';
import { appCareStatus, timestamps } from './schema-helper';

export const UserCarePlanTable = t.pgTable(
  'user_care_plans',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'restrict' })
      .notNull(),
    carePlanId: t
      .uuid('care_plan_id')
      .references(() => CarePlanTable.id, { onDelete: 'restrict' })
      .notNull(),
    currentPeriodStart: t
      .timestamp('current_period_start', { withTimezone: true })
      .notNull(),
    currentPeriodEnd: t
      .timestamp('current_period_end', { withTimezone: true })
      .notNull(),
    stripeSubscriptionId: t
      .varchar('stripe_subscription_id', { length: 255 })
      .unique(),
    billingIntervalSnapshot: t.varchar('billing_interval_snapshot').notNull(),
    totalSnapshot: t.integer('total_snapshot').notNull(),
    status: appCareStatus('status').notNull().default('incomplete'),
    ...timestamps,
  },
  (table) => [
    t.index('careplan_userId_idx').on(table.userId),
    t.index('careplan_carePlanId_idx').on(table.carePlanId),
    t.check('total_check', sql`${table.totalSnapshot} >= 0`),
    t.check(
      'period_check',
      sql`${table.currentPeriodEnd} > ${table.currentPeriodStart}`,
    ),
    t
      .uniqueIndex('user_care_plans_one_active_idx')
      .on(table.userId)
      .where(
        sql`${table.status} IN ('active', 'trialing', 'past_due', 'unpaid')`,
      ),
  ],
);
