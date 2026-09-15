import * as z from 'zod';

/**
 * Valiate Newsletter Form
 */
export const NewsletterFormSchema = z.object({
  email: z.email('Must be a valid email address').min(1, 'Email is required'),
});
/**
 * Newsletter Form Input Type
 */
export type NewsletterFormInput = z.input<typeof NewsletterFormSchema>;
/**
 * Newsletter Form Output Type
 */
export type NewsletterFormOutput = z.output<typeof NewsletterFormSchema>;

/**
 * Validate Contact Form Schema
 */
export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character'),
  email: z.email('Must be a valid email address').min(1, 'Email is required'),
  message: z
    .string()
    .min(10, 'Message must have at least 10 characters')
    .max(3000, 'Message cannot exceeds 3000 characters'),
  minBudget: z.coerce.number().min(1, 'Min Budget helps scope the project'),
  maxBudget: z.coerce.number(),
  service: z
    .enum(['web-development', 'ui-ux', 'custom'])
    .default('web-development'),
});
/**
 * Validate Contact Form Input
 */
export type ContactFormInput = z.input<typeof ContactFormSchema>;
/**
 * Validate Contact Form Output
 */
export type ContactFormOutput = z.output<typeof ContactFormSchema>;
