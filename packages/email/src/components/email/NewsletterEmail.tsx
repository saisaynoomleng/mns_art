import React from 'react';
import {
  Tailwind,
  Html,
  Body,
  Head,
  Container,
  Section,
  Text,
  Preview,
  Heading,
} from 'react-email';
import tailwindConfig from '../utils/tailwindConfig';
import { LogoEmail } from '../utils/LogoEmail';
import { LinkEmail } from '../utils/LinkEmail';

const NewsletterEmail = (): React.JSX.Element => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>MNS Art Newsletter</title>
        </Head>

        <Body className="bg-brand_black text-brand_white font-body leading-normal tracking-normal overflow-hidden">
          <Preview>
            Welcome aboard — here's what to expect in your inbox.
          </Preview>

          <Container className="mx-auto max-w-160">
            <LogoEmail />

            <Section>
              <Heading className="text-primary-400 font-heading">
                You're on the list
              </Heading>

              <Text>
                Thanks for subscribing to the MNS Art newsletter. From here on,
                expect a few things in your inbox: what we're working on, small
                lessons from the studio, and the occasional idea worth passing
                along. Nothing more than that.
              </Text>

              <Text>You can unsubscribe any time — no hard feelings.</Text>
            </Section>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default NewsletterEmail;
