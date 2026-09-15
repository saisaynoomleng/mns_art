import * as t from 'drizzle-orm/pg-core';

export const userRole = t.pgEnum('userRole', ['admin', 'user', 'super_admin']);

export const timestamps = {
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const contactStatus = t.pgEnum('contactStatus', [
  'new',
  'in_progress',
  'replied',
  'spam',
  'resolved',
]);

export const testimonialStatus = t.pgEnum('testimonialStatus', [
  'new',
  'reviewed',
  'spam',
]);

export const artworkStatus = t.pgEnum('artworkStatus', [
  'on_call',
  'concept',
  'prototype',
  'developing',
  'review',
  'finished',
]);

export const appCareStatus = t.pgEnum('appCareStatus', [
  'active',
  'incomplete',
  'incomplete_expired',
  'trialing',
  'past_due',
  'canceled',
  'paused',
  'unpaid',
]);
