'use server';

import {
  ActionResponse,
  ContactFormInput,
  ContactFormOutput,
  ContactFormSchema,
} from '@mnsart/utils';
import { renderContactEmail } from '@mnsart/email';

import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from '@/lib/aws/sesClient';
import db from '@/db';
import { ContactTable } from '@/db/schema';

export const handleContactForm = async (
  data: ContactFormInput,
): Promise<ActionResponse<ContactFormOutput>> => {
  try {
    const result = ContactFormSchema.safeParse(data);

    if (!result.success) {
      const error = result.error.issues[0];

      return {
        success: false,
        message: error.message,
        field: error.path.join('.') as keyof ContactFormInput,
      };
    }

    const { name, email, message, minBudget, maxBudget, service } = result.data;

    const html = await renderContactEmail();

    const emailClient = sesClient();

    await emailClient.send(
      new SendEmailCommand({
        Source: 'contact@mnsart.com',

        Destination: {
          ToAddresses: [email],
        },

        ReplyToAddresses: ['saileng9723@gmail.com'],

        Message: {
          Subject: {
            Data: 'Your message has landed',
          },

          Body: {
            Html: {
              Data: html,
            },
          },
        },
      }),
    );

    await db.insert(ContactTable).values({
      name,
      email,
      message,
      minBudget,
      maxBudget,
      service,
      status: 'new',
    });

    return {
      success: true,
      message: 'Your Message Has Reached Us!',
    };
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));

    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
