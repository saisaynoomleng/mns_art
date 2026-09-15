import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
  UserTable: {
    sessions: r.many.SessionTable({
      from: r.UserTable.id,
      to: r.SessionTable.userId,
    }),
    accounts: r.many.AccountTable({
      from: r.UserTable.id,
      to: r.AccountTable.userId,
    }),
    testimonials: r.many.TestimonialTable({
      from: r.UserTable.id,
      to: r.TestimonialTable.userId,
    }),
    artworks: r.many.ArtworkTable({
      from: r.UserTable.id,
      to: r.ArtworkTable.userId,
    }),
    carePlans: r.many.UserCarePlanTable({
      from: r.UserTable.id,
      to: r.UserCarePlanTable.userId,
    }),
    invoices: r.many.InvoiceTable({
      from: r.UserTable.id,
      to: r.InvoiceTable.userId,
    }),
  },
  SessionTable: {
    user: r.one.UserTable({ from: r.SessionTable.userId, to: r.UserTable.id }),
  },
  AccountTable: {
    user: r.one.UserTable({ from: r.AccountTable.userId, to: r.UserTable.id }),
  },
  TestimonialTable: {
    user: r.one.UserTable({
      from: r.TestimonialTable.userId,
      to: r.UserTable.id,
    }),
  },
  ArtworkTable: {
    user: r.one.UserTable({ from: r.ArtworkTable.userId, to: r.UserTable.id }),
  },
  CarePlanTable: {
    userCarePlans: r.many.UserCarePlanTable({
      from: r.CarePlanTable.id,
      to: r.UserCarePlanTable.carePlanId,
    }),
  },
  UserCarePlanTable: {
    user: r.one.UserTable({
      from: r.UserCarePlanTable.userId,
      to: r.UserTable.id,
    }),
    carePlan: r.one.CarePlanTable({
      from: r.UserCarePlanTable.carePlanId,
      to: r.CarePlanTable.id,
    }),
    invoices: r.many.InvoiceTable({
      from: r.UserCarePlanTable.id,
      to: r.InvoiceTable.userCarePlanId,
    }),
  },
  ContactTable: {
    messages: r.many.ContactMessageTable({
      from: r.ContactTable.id,
      to: r.ContactMessageTable.contactId,
    }),
  },
  ContactMessageTable: {
    contact: r.one.ContactTable({
      from: r.ContactMessageTable.contactId,
      to: r.ContactTable.id,
    }),
  },
  InvoiceTable: {
    user: r.one.UserTable({
      from: r.InvoiceTable.userId,
      to: r.UserTable.id,
    }),
    userCarePlan: r.one.UserCarePlanTable({
      from: r.InvoiceTable.userCarePlanId,
      to: r.UserCarePlanTable.id,
    }),
  },
}));
