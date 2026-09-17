import { clsx, twMerge } from 'cn';
import React, { ComponentPropsWithoutRef } from 'react';

type BoundedProp<T extends React.ElementType> = {
  className?: string;
  as?: T;
  padding?: Padding;
  spacing?: Spacing;
  children: React.ReactNode;
  size?: Size;
} & Omit<ComponentPropsWithoutRef<T>, 'classname' | 'as'>;

type Padding = 'none' | 'sm' | 'md' | 'lg';

type Spacing = 'none' | 'sm' | 'md' | 'lg';

type Size = 'sm' | 'md' | 'full';

const paddingVariants: Record<Padding, string> = {
  none: '',
  sm: 'px-4 md:px-6 lg:px-8',
  md: 'px-6 md:px-8 lg:px-10',
  lg: 'px-8 md:px-10 lg:px-12',
};

const spacingVariants: Record<Spacing, string> = {
  none: '',
  sm: 'space-y-6 md:space-y-8 lg:space-y-10',
  md: 'space-y-8 md:space-y-10 lg:space-y-12',
  lg: 'space-y-10 md:space-y-12 lg:space-y-16',
};

const sizeVariants: Record<Size, string> = {
  sm: 'max-w-4xl',
  md: 'max-w-7xl',
  full: 'max-w-none',
};

export const Bounded = <T extends React.ElementType>({
  className,
  as,
  padding = 'sm',
  children,
  spacing = 'none',
  size = 'md',
  ...props
}: BoundedProp<T>) => {
  const Comp = as ?? 'section';

  return (
    <Comp
      data-testid="wrapper"
      className={twMerge(
        clsx(
          'py-4 md:py-6 mx-auto',
          paddingVariants[padding],
          spacingVariants[spacing],
          sizeVariants[size],
          className,
        ),
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
