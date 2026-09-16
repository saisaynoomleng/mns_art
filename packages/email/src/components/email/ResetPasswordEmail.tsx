import React from 'react';
import {
  Html,
  Body,
  Container,
  Section,
  Text,
  Tailwind,
  Head,
  Preview,
  Heading,
} from 'react-email';
import tailwindConfig from '../utils/tailwindConfig';
import { ResetPasswordType } from '@mnsart/utils';
import { LogoEmail } from '../utils/LogoEmail';
import { LinkEmail } from '../utils/LinkEmail';

const ResetPasswordEmail = ({
  expiresAt = 15,
  otp,
}: ResetPasswordType): React.JSX.Element => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>Reset Password Email</title>
        </Head>

        <Body className="text-brand_white bg-brand_black leading-normal tracking-normal overflow-hidden font-body">
          <Preview>
            Reset your password — link expires in {`${expiresAt} minutes`}.
          </Preview>

          <Container className="mx-auto max-w-160">
            <LogoEmail />

            <Section>
              <Heading className="text-primary-400">
                Let's get you back in
              </Heading>

              <Text>
                We received a request to reset your password. Check below to
                choose a new one — the OTP is good for
                <span className="text-secondary-400 font-semibold">
                  {' '}
                  {`${expiresAt}`}{' '}
                </span>
                minutes
              </Text>

              <Text className="font-semibold text-lg text-primary-400">
                {otp}
              </Text>

              <Text>
                If this wasn't you, no action needed — your password stays the
                same.
              </Text>

              <Text>
                For your security, this OTP expires soon and works only once.
              </Text>
            </Section>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ResetPasswordEmail;
