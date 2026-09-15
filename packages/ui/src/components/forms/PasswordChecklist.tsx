import { PasswordRules } from '@mnsart/utils';
import { clsx, twMerge } from 'cn';
import React, { ComponentPropsWithoutRef } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

type PasswordCheckListProps = {
  className?: string;
  password: string;
} & Omit<ComponentPropsWithoutRef<'ul'>, 'className'>;

export const PasswordCheckList = ({
  className,
  password,
  ...props
}: PasswordCheckListProps): React.JSX.Element => {
  return (
    <div>
      <p>Password Requirements</p>
      <ul
        className={twMerge(clsx('', className))}
        aria-label="Password Requirements List"
        aria-live="polite"
        {...props}
      >
        {PasswordRules.map((rule) => {
          const passed = rule.test(password);

          return (
            <li
              key={rule.id}
              className={clsx(
                'flex items-center gap-x-2 transition-colors duration-200 text-fs-300',
                passed ? 'text-brand-success-400' : 'text-brand-error-300',
              )}
            >
              {passed ? <FiCheck aria-hidden /> : <FiX aria-hidden color="" />}
              <span>{rule.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
