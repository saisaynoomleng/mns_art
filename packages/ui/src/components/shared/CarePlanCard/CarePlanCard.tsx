import { CallToAction, formatPriceInUSD } from '@mnsart/utils';
import { clsx, twMerge } from 'cn';
import React from 'react';
import { SiMermaid } from 'react-icons/si';
import { GiMermaid } from 'react-icons/gi';
import { Separator } from '#components/ui/separator';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#components/ui/card';
import { ArrowButton } from '../ArrowButton';

type CarePlanCardProps = {
  className?: string;
  name: string;
  excerpt: string;
  pricePerMonth: number;
  inclusives: Inclusive[];
  action: CallToAction;
  renderAction: (props: CallToAction) => React.ReactElement;
  isPremium: boolean;
  exclusives: string[];
};

type Inclusive = {
  title: string;
  _key: string;
};

export const CarePlanCard = ({
  className,
  name,
  excerpt,
  pricePerMonth,
  action,
  renderAction,
  isPremium,
  inclusives,
  exclusives,
}: CarePlanCardProps): React.JSX.Element => {
  return (
    <Card
      className={twMerge(
        clsx(
          'rounded-2xl border-2 border-brand-accent-500 bg-background  duration-200 transition-all max-w-100 hover:brand-box-shadow hover:border-primary',
          className,
        ),
      )}
    >
      <CardHeader>
        <div className="flex gap-x-6 items-center">
          <div>
            {isPremium ? (
              <GiMermaid
                color="#191923"
                size={50}
                aria-hidden
                className="border-2 border-brand-black brand-box-shadow bg-secondary p-2"
              />
            ) : (
              <SiMermaid
                color="#191923"
                size={50}
                aria-hidden
                className="border-2 border-brand-black brand-box-shadow bg-primary p-2"
              />
            )}
          </div>

          <div>
            <CardTitle className="font-heading text-primary text-fs-600!">
              {name}
            </CardTitle>

            <CardDescription className="text-muted-foreground">
              {excerpt}
            </CardDescription>
          </div>
        </div>

        <p className="font-heading text-primary text-fs-500">
          {formatPriceInUSD(pricePerMonth)}/month
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-2">
        <Separator className="bg-brand-accent-400/30 my-2" />

        <div className="flex flex-col gap-y-2">
          <p className="font-semibold text-brand-accent-400 underline decoration-wavy underline-offset-4 text-fs-400">
            What&apos;s included
          </p>
          <ul className="flex flex-col gap-y-1 list-disc">
            {inclusives.map((feature) => (
              <li
                key={feature._key}
                className="text-fs-300 list-inside marker:text-brand-accent-400"
              >
                {feature.title}
              </li>
            ))}
          </ul>
        </div>

        <Separator className="bg-brand-accent-400/30 my-2" />

        <div className="flex flex-col gap-y-2">
          <p className="font-semibold text-brand-accent-400 underline decoration-wavy underline-offset-4 text-fs-400">
            What&apos;s <span className="text-secondary">NOT</span> included
          </p>

          <ul className="flex flex-col gap-y-1 list-disc">
            {exclusives.map((feature) => (
              <li
                key={feature}
                className="text-fs-300 list-inside marker:text-brand-accent-400"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="mt-auto">
        <ArrowButton
          asChild={true}
          label={renderAction({ label: action.label, href: action.href })}
          className="mx-auto"
        />
      </CardFooter>
    </Card>
  );
};
