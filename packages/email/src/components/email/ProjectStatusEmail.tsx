import { ProjectStatus, replaceUnderscore, toTitleCase } from '@mnsart/utils';
import React from 'react';
import {
  Tailwind,
  Body,
  Html,
  Container,
  Head,
  Preview,
  Section,
  Text,
  Heading,
  Link,
} from 'react-email';
import tailwindConfig from '../utils/tailwindConfig';
import { LogoEmail } from '../utils/LogoEmail';
import { LinkEmail } from '../utils/LinkEmail';

type ProjectBody = {
  preview: string;
  body: string;
};

type ProjectStatusEmailProp = {
  status: ProjectStatus;
  projectName: string;
  clientName: string;
};

const projectStatus: Record<ProjectStatus, ProjectBody> = {
  on_call: {
    body: `We're on the line together, sketching out what this project should become.`,
    preview: `We're sketching out the direction together.`,
  },

  concept: {
    body: `The idea is on paper now — rough shapes, first direction.`,
    preview: `The first shapes are down on paper.`,
  },

  prototype: {
    body: `We've built the first draft, just enough to see if it holds up.`,
    preview: `A first draft now exists.`,
  },

  developing: {
    body: `We're deep in it, building it piece by piece.`,
    preview: `We're building it piece by piece.`,
  },

  review: {
    body: `We've stepped back to look at it with fresh eyes before it goes further.`,
    preview: `Taking a careful second look.`,
  },

  finished: {
    body: `It's done, and it's ready for you to see.`,
    preview: `It's ready for you to see.`,
  },
};

const ProjectStatusEmail = ({
  status = 'on_call',
  clientName,
  projectName,
}: ProjectStatusEmailProp): React.JSX.Element => {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <title>Project Status Email</title>
        </Head>

        <Body className="bg-brand_black text-brand_white font-body leading-normal tracking-normal overflow-hidden">
          <Preview>{projectStatus[status].preview}</Preview>

          <Container className="mx-auto max-w-160">
            <LogoEmail />

            <Section>
              <Heading className="text-primary-400">
                Your project just moved to:{' '}
                <span className="text-secondary-400">
                  {toTitleCase(replaceUnderscore(status))}
                </span>
              </Heading>

              <Text>Hello {clientName && toTitleCase(clientName)},</Text>

              <Text>
                Here's a quick update on{' '}
                <span className="text-secondary-400 font-semibold">
                  {projectName && toTitleCase(projectName)}
                </span>
              </Text>

              <Text className="font-semibold text-secondary-400">
                {projectStatus[status].body}
              </Text>

              <Text>We'll check back in as the next step takes shape.</Text>

              <Text>
                Question any time — just{' '}
                <Link
                  href="mailto:saileng9723@gmail.com"
                  className="text-secondary-400 underline underline-offset-4"
                >
                  send an email
                </Link>
                , or drop a message to our shared channel directly
              </Text>
            </Section>

            <LinkEmail />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ProjectStatusEmail;
