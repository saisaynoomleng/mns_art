import { FormContainer } from '#components/shared/FormContainer/FormContainer';
import React from 'react';
import { ArrowButton, SectionTitle } from '../../shared';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { CallToAction, SignUpFormInput, SignUpFormSchema } from '@mnsart/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx, twMerge } from 'cn';
import { Field, FieldGroup, FieldSeparator } from '#components/ui/field';
import { Button } from '#components/ui/button';
import { FaGoogle } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import { FormTextField } from '../FormTextField';
import { LoadingSpinner } from '#components/shared/LoadingSpinner';
import { PasswordCheckList } from '../PasswordChecklist';
import { toast } from 'sonner';

type SignUpFormProps = {
  className?: string;
  onSubmit: (data: SignUpFormInput) => Promise<void>;
  singInAction: CallToAction;
  renderSignIn: (props: CallToAction) => React.ReactElement;
  OAuthAction: (provider: OAuthProvider) => Promise<void> | void;
};

type OAuthProvider = 'google' | 'github';

export const SignUpForm = ({
  className,
  onSubmit,
  singInAction,
  renderSignIn,
  OAuthAction,
}: SignUpFormProps): React.JSX.Element => {
  const form = useForm<SignUpFormInput>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = useWatch({ control: form.control, name: 'password' });

  const handleFormSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
    try {
      await onSubmit(data);
    } catch (err) {
      toast.error('Something went wrong');
      form.setError('root', {
        message:
          err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <FormContainer>
      <div className="flex flex-col gap-y-6">
        <div className="text-center">
          <SectionTitle label="Sign Up" />
          <p className="text-fs-300">Just a few things to get started</p>
        </div>

        <div className="flex items-center justify-center gap-x-4">
          <Button
            type="button"
            onClick={() => OAuthAction('google')}
            aria-label="Continue with Google"
          >
            <FaGoogle />
          </Button>

          <Button
            type="button"
            onClick={() => OAuthAction('github')}
            aria-label="Continue with GitHub"
          >
            <FaGithub />
          </Button>
        </div>

        <FieldSeparator>Or Continue With</FieldSeparator>

        {form.formState.errors.root && (
          <p role="alert" className="text-fs-200 text-brand-error-400">
            {form.formState.errors.root.message}
          </p>
        )}

        <form
          noValidate
          className={twMerge(
            clsx('flex flex-col gap-y-4 md:min-w-100 lg:min-w-150', className),
          )}
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <FieldGroup>
            <FormTextField
              control={form.control}
              name="name"
              autoComplete="name"
              label="Full Name"
            />

            <FormTextField
              control={form.control}
              name="email"
              autoComplete="email"
              type="email"
              label="Email"
            />

            <FormTextField
              control={form.control}
              name="password"
              type="password"
              label="Password"
              autoComplete="new-password"
            />

            <FormTextField
              control={form.control}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              autoComplete="new-password"
            />

            <PasswordCheckList
              password={password ?? ''}
              className="mt-1"
              id="password-requirements"
            />

            <Field orientation="horizontal">
              <ArrowButton
                data-testid="sign up button"
                disabled={form.formState.isSubmitting}
                label={
                  form.formState.isSubmitting ? (
                    <span>
                      <LoadingSpinner />
                    </span>
                  ) : (
                    <span>Sign Up Now</span>
                  )
                }
              />
            </Field>
          </FieldGroup>
        </form>

        <p className="flex items-center self-end gap-x-1 text-fs-300">
          Already a member?
          <span className="underline decoration-2 decoration-secondary">
            {renderSignIn({
              label: singInAction.label,
              href: singInAction.href,
            })}
          </span>
        </p>
      </div>
    </FormContainer>
  );
};
