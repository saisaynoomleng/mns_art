import React from 'react';
import {
  Html,
  Body,
  Tailwind,
  Container,
  Text,
  Preview,
  Heading,
  Link,
  render,
} from 'react-email';
import tailwindConfig from '../utils/tailwindConfig';
import { LinkEmail } from '../utils/LinkEmail';
import { LogoEmail } from '../utils/LogoEmail';
import { SignUpVerificationType } from '@mnsart/utils';

const SignUpVerificationEmail = ({
  url,
  expiresAt = 15,
}: SignUpVerificationType): React.JSX.Element => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <head>
          <title>Sign Up Verification Email</title>
        </head>

        <Body className="bg-brand_black text-brand_white font-body leading-normal tracking-normal overflow-x-hidden px-2">
          <Preview>Verify your email to finish signing up.</Preview>

          <Container className="mx-auto max-w-160">
            <LogoEmail />

            <Heading className="font-heading text-primary-400">
              One click to confirm it's you
            </Heading>

            <Text>
              Welcome to MNS Art. Before we open the door, we just need to make
              sure this is really you. Click below to verify your email — it
              only takes a second, and then you're in.
            </Text>

            <Link
              href={url}
              className="text-secondary-400 underline underline-offset-4"
            >
              Verify your email
            </Link>

            <Text>
              This link will be expired in
              <span className="text-secondary-400 font-semibold">
                {' '}
                {`${expiresAt}`}{' '}
              </span>
              minutes
            </Text>

            <Text>
              If you didn't request this, you can ignore this message.
            </Text>

            <Text>
              This link works once you click it — no need to copy or type
              anything.
            </Text>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default SignUpVerificationEmail;

export const renderSignUpVerificationEmail = async ({
  url,
  expiresAt = 15,
}: SignUpVerificationType) => {
  return await render(SignUpVerificationEmail({ url, expiresAt }));
};
