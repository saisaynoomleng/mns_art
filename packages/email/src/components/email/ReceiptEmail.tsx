import {
  formatDateUS,
  formatPriceInUSD,
  ReceiptEmailType,
  toTitleCase,
} from '@mnsart/utils';
import {
  Html,
  Body,
  Text,
  Container,
  Section,
  Tailwind,
  Head,
  Preview,
  Heading,
  Row,
  Column,
} from 'react-email';
import tailwindConfig from '../utils/tailwindConfig';
import { LogoEmail } from '../utils/LogoEmail';
import { LinkEmail } from '../utils/LinkEmail';

const ReceiptEmail = ({
  item,
  amount,
  date,
  paymentMethod,
}: ReceiptEmailType) => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>Receipt Email</title>
        </Head>

        <Body className="bg-brand_black text-brand_white overflow-x-hidden leading-normal tracking-normal font-body">
          <Preview>A copy of your payment, for your records</Preview>

          <Container className="mx-auto max-w-160">
            <LogoEmail />

            <Section>
              <Heading className="text-primary-400">
                Your receipt from MNS Art
              </Heading>

              <Text>
                Thanks for your payment. Here's a record of it, for your files:
              </Text>

              <Section align="left" className="mb-4">
                <Row align="left">
                  <Column className="w-40">Item:</Column>

                  <Column className="font-semibold text-primary-400">
                    {item && toTitleCase(item)}
                  </Column>
                </Row>

                <Row align="left">
                  <Column className="w-40">Amount:</Column>

                  <Column className="font-semibold text-primary-400">
                    {amount && formatPriceInUSD(amount)}
                  </Column>
                </Row>

                <Row align="left">
                  <Column className="w-40">Date:</Column>

                  <Column className="font-semibold text-primary-400">
                    {date ? formatDateUS(date) : formatDateUS(new Date())}
                  </Column>
                </Row>

                <Row align="left">
                  <Column className="w-40">Payment Method:</Column>

                  <Column className="font-semibold text-primary-400">
                    {paymentMethod && toTitleCase(paymentMethod)}
                  </Column>
                </Row>
              </Section>

              <Text>
                If anything looks off, just reply to this email and we'll sort
                it out.
              </Text>

              <Text>
                Keep this for your records — no action needed on your end.
              </Text>
            </Section>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ReceiptEmail;
