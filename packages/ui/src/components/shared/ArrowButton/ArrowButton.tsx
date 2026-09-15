import { Button } from '#components/ui/button';
import { clsx, twMerge } from 'cn';
import React, { ComponentPropsWithoutRef } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

type ArrowButtonProps = {
  className?: string;
  label: React.ReactNode;
  disabled?: boolean;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className'>;

export const ArrowButton = ({
  className,
  label,
  disabled,
}: ArrowButtonProps): React.JSX.Element => {
  return (
    <div className={twMerge(clsx('group flex items-center', className))}>
      <span
        className="
      flex w-0 items-center overflow-hidden
      transition-[width] duration-300 ease-in-out
      group-hover:w-7.5
    "
      >
        <FaArrowAltCircleRight
          size={30}
          className="
        shrink-0 scale-0 text-secondary
        transition-transform duration-300
        group-hover:scale-100
      "
        />
      </span>

      <Button
        className="transition-transform duration-300 delay-100"
        disabled={disabled}
      >
        {label}
      </Button>

      <span
        className="
      flex w-7.5 items-center overflow-hidden
      transition-[width] duration-300 ease-in-out
      group-hover:w-0
    "
      >
        <FaArrowAltCircleRight
          size={30}
          className="
        shrink-0 scale-100 text-secondary
        transition-transform duration-300
        group-hover:scale-0
      "
        />
      </span>
    </div>
  );
};
