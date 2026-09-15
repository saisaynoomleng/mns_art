import * as z from 'zod';
import { PasswordRules } from './helper';

/**
 * Valiate Newsletter Form
 */
export const NewsletterFormSchema = z.object({
  email: z
    .email({ error: 'Must be a valid email address' })
    .min(1, { error: 'Email is required' }),
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
  name: z.string().min(1, { error: 'Name is required' }),
  email: z
    .email({ error: 'Must be a valid email address' })
    .min(1, { error: 'Email is required' }),
  message: z
    .string()
    .min(10, { error: 'Message must have at least 10 characters' })
    .max(3000, { error: 'Message cannot exceeds 3000 characters' }),
  minBudget: z.coerce
    .number()
    .min(1, { error: 'Min Budget helps scope the project' }),
  maxBudget: z.coerce.number(),
  service: z
    .enum(['web-development', 'ui-ux', 'custom'])
    .default('web-development'),
});
/**
 * Contact Form Input Type
 */
export type ContactFormInput = z.input<typeof ContactFormSchema>;
/**
 * Contact Form Output Type
 */
export type ContactFormOutput = z.output<typeof ContactFormSchema>;

/**
 * Password Schema
 */
export const PasswordSchema = z
  .string()
  .refine((value) => PasswordRules.every((rule) => rule.test(value)), {
    error: 'Password does not meet requirements',
  });

/**
 * Validate Sign Up form schema
 */
export const SignUpFormSchema = z
  .object({
    name: z.string().min(1, { error: 'Full Name is required' }),
    email: z.string().min(1, { error: 'Email is required' }),
    password: PasswordSchema,
    confirmPassword: z
      .string()
      .min(8, { error: 'Password must have at least 8 characters' })
      .max(128, { error: 'Password cannot exceeds 128 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords must match',
    path: ['confirmPassword'],
  });
/**
 * Sign Up Form Input Type
 */
export type SignUpFormInput = z.input<typeof SignUpFormSchema>;
/**
 * Sign Up Form Output Type
 */
export type SignUpFormOutput = z.output<typeof SignUpFormSchema>;
