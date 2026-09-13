import {
  Html,
  Body,
  Tailwind,
  Text,
  Container,
  Section,
  Head,
} from 'react-email';

import React from 'react';

const ContactEamil = (): React.JSX.Element => {
  return (
    <Tailwind>
      <Html>
        <Head>
          <title>Contact Eamil</title>
        </Head>

        <Body></Body>
      </Html>
    </Tailwind>
  );
};

export default ContactEamil;
