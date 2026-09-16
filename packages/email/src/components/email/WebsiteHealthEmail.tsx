import React from 'react';
import {
  Html,
  Body,
  Head,
  Container,
  Section,
  Text,
  Tailwind,
  Preview,
  Heading,
  Column,
  Row,
} from 'react-email';
import tailwindConfig from '../utils/tailwindConfig';
import { LogoEmail } from '../utils/LogoEmail';
import { WebsiteHealthType } from '@mnsart/utils';
import { LinkEmail } from '../utils/LinkEmail';

const WebsiteHealthEmail = ({
  projectName,
  uptime,
  responseTime,
  errorCounts,
  flaggedCounts,
}: WebsiteHealthType): React.JSX.Element => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>Website Health Email</title>
        </Head>

        <Body className="bg-brand_black text-brand_white font-body leading-normal tracking-normal overflow-x-hidden">
          <Preview>
            Uptime, response time, and errors — this month's numbers.
          </Preview>

          <Container className="mx-auto max-w-160">
            <LogoEmail />

            <Section>
              <Heading className="text-primary-400 font-semibold">
                A quick check-up on
                <span className="font-semibold text-secondary-400">
                  {projectName}
                </span>
              </Heading>

              <Text>Here's how the site is doing:</Text>

              <Section align="left" className="max-w-120 text-sm">
                <Row>
                  <Column className="w-40">Uptime:</Column>
                  <Column className="text-primary-400">{uptime}</Column>
                </Row>

                <Row>
                  <Column className="w-40">Response Time:</Column>
                  <Column className="text-primary-400">{responseTime}</Column>
                </Row>

                <Row>
                  <Column className="w-40">Error Counts:</Column>
                  <Column className="text-primary-400">{errorCounts}</Column>
                </Row>

                <Row>
                  <Column className="w-40">Flagged:</Column>
                  <Column className="text-primary-400">{flaggedCounts}</Column>
                </Row>
              </Section>
            </Section>

            <Text>Nothing here needs a fire drill unless marked above.</Text>

            <Text>Full history and logs are available in the dashboard.</Text>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default WebsiteHealthEmail;
