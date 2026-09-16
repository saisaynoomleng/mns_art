import React from 'react';
import { Section, Img, Link, Row, Column, Text } from 'react-email';
import {
  FACEBOOK_LINK,
  FACEBOOK_PNG_URL,
  GITHUB_LINK,
  GITHUB_PNG_URL,
} from '../../lib/utils';

export const LinkEmail = (): React.JSX.Element => {
  return (
    <Section className="">
      <Section className="mt-2 w-fit" align="left">
        <Row>
          <Column className="w-5">
            <Link
              href={FACEBOOK_LINK}
              className="block"
              target="_blank"
              rel="noreferrer nofollow"
            >
              <Img
                src={FACEBOOK_PNG_URL}
                alt="facebook logo png"
                width={50}
                height={50}
                className="block"
              />
            </Link>
          </Column>

          <Column className="w-5">
            <Link
              href={GITHUB_LINK}
              className="block"
              target="_blank"
              rel="noreferrer nofollow"
            >
              <Img
                src={GITHUB_PNG_URL}
                alt="github logo png"
                width={50}
                height={50}
                className="block"
              />
            </Link>
          </Column>
        </Row>
      </Section>

      <Section className="text-white/60">
        <Text>
          5000 Euclid Ave, Apt 206
          <br />
          Cleveland, OH, 44103
          <br />
          United States
        </Text>

        {/* unsubscribe link */}
      </Section>
    </Section>
  );
};
