import React from 'react';
import { Section, Img, Link, Row, Column } from 'react-email';
import {
  FACEBOOK_LINK,
  FACEBOOK_PNG_URL,
  GITHUB_LINK,
  GITHUB_PNG_URL,
} from '../../lib/utils';

export const LinkEmail = (): React.JSX.Element => {
  return (
    <Section className="mx-auto mt-2 mb-8 w-fit">
      <Row>
        <Column className="pr-[20px] w-[20px]">
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

        <Column className="pr-[20px] w-[20px]">
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
  );
};
