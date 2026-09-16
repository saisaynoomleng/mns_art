import React from 'react';
import {
  Tailwind,
  Body,
  Head,
  Html,
  Section,
  Container,
  Preview,
  Heading,
  Text,
} from 'react-email';
import tailwindConfig from '../utils/tailwindConfig';
import { LogoEmail } from '../utils/LogoEmail';
import { toTitleCase } from '@mnsart/utils';
import { LinkEmail } from '../utils/LinkEmail';

const WelcomeEmail = ({
  clientName,
}: {
  clientName: string;
}): React.JSX.Element => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>Welcome Email</title>
        </Head>

        <Body className="bg-brand_black text-brand_white overflow-x-hidden leading-normal tracking-normal font-body">
          <Preview>Your account's ready — come take a look</Preview>

          <Container className="mx-auto max-w-160">
            <LogoEmail />

            <Section>
              <Heading className="text-primary-400">
                Welcome to{' '}
                <span className="font-semibold text-secondary-400">
                  MNS Art&reg;
                </span>
              </Heading>

              <Text>
                Hello{' '}
                <span className="text-secondary-400">
                  {clientName && toTitleCase(clientName)}
                </span>
                ,
              </Text>

              <Text>
                Your account is ready, and so is your place here. We build
                things carefully at MNS Art, and we're glad to have you along
                for it
              </Text>

              <Text>
                Take a look around, and reach out any time — we're not far.
              </Text>

              <Text>
                If you ever need anything, this inbox reaches us directly.
              </Text>
            </Section>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default WelcomeEmail;
