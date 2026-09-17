'use server';

import { sesClient } from '@/lib/aws/sesClient';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { renderResetPasswordEmail } from '@mnsart/email';
import { toTitleCase } from '@mnsart/utils';

type handlePasswordEmailProps = {
  email: string;
  otp: string;
  type: 'forget-password';
};

export const handleResetPasswordEmail = async ({
  email,
  otp,
  type,
}: handlePasswordEmailProps): Promise<void> => {
  try {
    const html = await renderResetPasswordEmail({ otp, expiresAt: 15 });

    const emailClient = sesClient();

    void emailClient.send(
      new SendEmailCommand({
        Source: 'noreply@mnsart.com',

        Destination: {
          ToAddresses: [email],
        },

        Message: {
          Subject: {
            Data: `${toTitleCase(type)} OTP`,
            Charset: 'utf-8',
          },

          Body: {
            Html: {
              Data: html,
              Charset: 'utf-8',
            },
          },
        },
      }),
    );
  } catch (error) {
    console.error('Reset Password OTP error', JSON.stringify(error, null, 2));
  }
};
