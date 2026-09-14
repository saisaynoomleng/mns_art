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
