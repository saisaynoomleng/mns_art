import {
  Html,
  Body,
  Tailwind,
  Text,
  Container,
  Section,
  Head,
  Preview,
  Heading,
} from 'react-email';

import React from 'react';
import tailwindConfig from '../utils/tailwindConfig';
import { LogoEmail } from '../utils/LogoEmail';
import { LinkEmail } from '../utils/LinkEmail';

const ContactEamil = (): React.JSX.Element => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>Contact Eamil</title>
        </Head>

        <Body className="bg-black text-white font-body leading-normal tracking-normal overflow-hidden">
          <Preview>We got your note — reply coming within 1-2 days.</Preview>

          <Container className="mx-auto max-w-[640px]">
            <LogoEmail />

            <Section>
              <Heading className="text-primary-400">
                Your message has landed
              </Heading>

              <Text>
                Thanks for reaching out to MNS Art. Your note made it to our
                desk, and we'll read it properly — not skim it. Expect a reply
                within 1-2 business days.
              </Text>

              <Text>
                In the meantime, feel free to look around at what we've been
                building.
              </Text>

              <Text>
                We read every message ourselves — nothing here is automated past
                this point.
              </Text>
            </Section>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ContactEamil;
