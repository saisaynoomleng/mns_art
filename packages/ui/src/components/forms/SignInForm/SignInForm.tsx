import { FormContainer } from '#components/shared/FormContainer/FormContainer';
import React from 'react';
import { ArrowButton, LoadingSpinner, SectionTitle } from '../../shared';
import { Button } from '#components/ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import { CallToAction, SignInFormInput, SignInFormSchema } from '@mnsart/utils';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Field,
  FieldSeparator,
  FieldLabel,
  FieldError,
} from '#components/ui/field';
import { FormTextField } from '../FormTextField';
import { clsx, twMerge } from 'cn';
import { Checkbox } from '#components/ui/checkbox';

type SignInFormProps = {
  className?: string;
  onSubmit: (data: SignInFormInput) => Promise<void>;
  singUpAction: CallToAction;
  renderSignUp: (props: CallToAction) => React.ReactElement;
  OAuthAction: (provider: OAuthProvider) => Promise<void> | void;
  forgetPasswordAction: CallToAction;
  renderForgetPassword: (props: CallToAction) => React.ReactElement;
};

type OAuthProvider = 'google' | 'github';

export const SignInForm = ({
  className,
  onSubmit,
  singUpAction,
  renderSignUp,
  OAuthAction,
  forgetPasswordAction,
  renderForgetPassword,
}: SignInFormProps): React.JSX.Element => {
  const form = useForm<SignInFormInput>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleSignIn: SubmitHandler<SignInFormInput> = async (data) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again');
      form.setError('root', {
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again',
      });
    }
  };
  return (
    <FormContainer>
      <div
        className={twMerge(
          clsx(
            'md:min-w-100 lg:min-w-150 flex flex-col gap-y-4 md:gap-y-6',
            className,
          ),
        )}
      >
        <div className="text-center">
          <SectionTitle label="Sign In" />
          <p className="text-fs-300">Welcome Back! Please enter your details</p>
        </div>

        <div className="grid grid-cols-2 gap-x-2">
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

        <form
          noValidate
          onSubmit={form.handleSubmit(handleSignIn)}
          className={clsx('flex flex-col gap-y-4')}
        >
          <FormTextField
            name="email"
            type="email"
            control={form.control}
            autoComplete="email"
            label="Email"
          />

          <FormTextField
            name="password"
            control={form.control}
            type="password"
            autoComplete="current-password"
            label="Password"
          />

          <Field orientation="horizontal">
            <Controller
              name="rememberMe"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    name={field.name}
                    aria-invalid={fieldState.invalid}
                    checked={!!field.value}
                    id="rememberMe"
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel htmlFor="rememberMe">Remember Me</FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="button" variant="link" asChild>
              {renderForgetPassword({
                label: forgetPasswordAction.label,
                href: forgetPasswordAction.href,
              })}
            </Button>
          </Field>

          <Field orientation="horizontal">
            <ArrowButton
              testId="sign in"
              disabled={form.formState.isSubmitting}
              label={
                form.formState.isSubmitting ? <LoadingSpinner /> : 'sign in'
              }
            />
          </Field>
        </form>

        <p className="flex items-center text-fs-300 justify-end">
          Not a member yet?
          <Button type="button" asChild variant="link">
            {renderSignUp({
              label: singUpAction.label,
              href: singUpAction.href,
            })}
          </Button>
        </p>
      </div>
    </FormContainer>
  );
};
