import { clsx, twMerge } from 'cn';
import React, { ComponentPropsWithoutRef } from 'react';

type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type SectionTitle<T extends Headings> = {
  className?: string;
  label: string;
  size?: Size;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'className'>;

type Size = 'sm' | 'md' | 'lg';

const sizeVariants: Record<Size, string> = {
  sm: 'text-fs-500 md:text-fs-600 lg:text-fs-700',
  md: 'text-fs-600 md:text-fs-700 lg:text-fs-800',
  lg: 'text-fs-700 md:text-fs-800 lg:text-fs-900',
};

export const SectionTitle = <T extends Headings>({
  className,
  label,
  as,
  size = 'sm',
  ...props
}: SectionTitle<T>): React.JSX.Element => {
  const Comp = as ?? 'h3';

  return (
    <Comp
      className={twMerge(
        clsx(
          'uppercase font-bold first-letter:font-heading first-letter:text-fs-600 first-letter:text-brand-secondary-500',
          sizeVariants[size],
          className,
        ),
      )}
      {...props}
      tabIndex={0}
    >
      {label}
    </Comp>
  );
};
