'use server';

import { sesClient } from '@/lib/aws/sesClient';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { renderSignUpVerificationEmail } from '@mnsart/email';
import type { User } from 'better-auth/types';

type handleSignUpVerificationProps = {
  user: User;
  url: string;
};

export const handleSignUpVerification = async ({
  user,
  url,
}: handleSignUpVerificationProps) => {
  try {
    const html = await renderSignUpVerificationEmail({ url, expiresAt: 15 });

    const emailClient = sesClient();

    void emailClient.send(
      new SendEmailCommand({
        Source: 'noreply@mnsart.com',

        Destination: { ToAddresses: [user.email] },

        Message: {
          Subject: {
            Data: 'Verify your email | MNS Art',
            Charset: 'UTF-8',
          },

          Body: {
            Html: {
              Data: html,
              Charset: 'UTF-8',
            },
          },
        },

        ConfigurationSetName: '',
      }),
    );
  } catch (error) {
    console.error('Sign up verification error', JSON.stringify(error, null, 2));
  }
};
