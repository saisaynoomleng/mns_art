/**
 * Media Type for Image
 */
export type Media = {
  src: string;
  alt: string;
};

/**
 * Call to Action Type for Hyperlinks
 */
export type CallToAction = {
  label: string;
  href: string;
};

/**
 * Response Type for Form Actions
 */
export type ActionResponse<T> =
  | { success: true; message: string; data?: T }
  | { success: false; message: string; field?: keyof T };

/**
 * Image Upload Response Type
 */
export type ImageResponse =
  { success: true; file: File } | { success: false; message: string };

/**
 * Password Rule
 */
export type PasswordRule = {
  id: string;
  label: string;
  test: (value: string) => boolean;
};

// ========================
// Email
// ========================

/**
 * Project Status Email Types
 */
export type ProjectStatusType =
  'on_call' | 'concept' | 'prototype' | 'developing' | 'review' | 'finished';

/**
 * Receipt Email Types
 */
export type ReceiptEmailType = {
  item: string;
  amount: number;
  date: Date | string;
  paymentMethod: string;
};

/**
 * Reset Password Email Types
 */
export type ResetPasswordType = {
  otp: string;
  expiresAt: number;
};

/**
 * Sign Up Verification Email Types
 */
export type SignUpVerificationType = {
  expiresAt: number;
  url: string;
};
