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

export const contactStatus = t.pgEnum('contact_status', [
  'new',
  'in_progress',
  'replied',
  'spam',
  'resolved',
]);

export const contactService = t.pgEnum('contact_service', [
  'web-development',
  'ui-ux',
  'custom',
]);

export const contactMessageDirection = t.pgEnum('contact_message_direction', [
  'inbound',
  'outbound',
]);

export const testimonialStatus = t.pgEnum('testimonial_status', [
  'new',
  'reviewed',
  'spam',
]);

export const artworkStatus = t.pgEnum('artwork_status', [
  'on_call',
  'concept',
  'prototype',
  'developing',
  'review',
  'finished',
]);

export const appCareStatus = t.pgEnum('app_care_status', [
  'active',
  'incomplete',
  'incomplete_expired',
  'trialing',
  'past_due',
  'canceled',
  'paused',
  'unpaid',
]);

export const invoiceSourceType = t.pgEnum('invoiceSourceType', [
  'care_plan',
  'project_deposit',
  'project_balance',
  'one_off',
]);

export const invoiceStatus = t.pgEnum('invoiceStatus', [
  'draft',
  'open',
  'paid',
  'void',
  'uncollectible',
  'refunded',
]);
