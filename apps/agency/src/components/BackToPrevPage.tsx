import { Button } from '@mnsart/ui';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { IoPlayBack } from 'react-icons/io5';

type BackToPrevPageProps = {
  className?: string;
  label: string;
  href: string;
};

const BackToPrevPage = ({
  className,
  label,
  href,
}: BackToPrevPageProps): React.JSX.Element => {
  return (
    <Button
      variant="link"
      className={twMerge(
        clsx(
          'uppercase text-brand-accent-500 font-semibold flex items-center w-fit rounded-none group animate-pulse hover:animate-none decoration-wavy underline',
          className,
        ),
      )}
      asChild
    >
      <IoPlayBack
        className="group-hover:-translate-x-1 duration-200 transition-transform"
        aria-hidden
      />
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackToPrevPage;
