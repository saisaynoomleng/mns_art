'use client';

import React, { useState } from 'react';
import { ArrowButton, SectionTitle } from '../../shared';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import {
  RequestPasswordOTPFormInput,
  RequestPasswordResetEmailFormInput,
  RequestPasswordResetEmailFormSchema,
  RequestPasswordResetOTPFormSchema,
  SetNewPasswordFormInput,
  SetNewPasswordFormSchema,
} from '@mnsart/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextField } from '../FormTextField';
import { FormContainer } from '#components/shared/FormContainer/FormContainer';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '#components/ui/input-otp';
import { Field, FieldLabel, FieldError } from '#components/ui/field';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { PasswordCheckList } from '../PasswordChecklist';
import { Button } from '#components/ui/button';

type ResetPasswordFormProps = {
  onRequestAction: (data: RequestPasswordResetEmailFormInput) => Promise<void>;
  onVerifyOTPAction: (data: RequestPasswordOTPFormInput) => Promise<void>;
  onSetNewPasswordAction: (data: SetNewPasswordFormInput) => Promise<void>;
};

export const ResetPasswordForm = ({
  onRequestAction,
  onVerifyOTPAction,
  onSetNewPasswordAction,
}: ResetPasswordFormProps): React.JSX.Element => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const RequestEmailForm = useForm<RequestPasswordResetEmailFormInput>({
    resolver: zodResolver(RequestPasswordResetEmailFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const OTPForm = useForm<RequestPasswordOTPFormInput>({
    resolver: zodResolver(RequestPasswordResetOTPFormSchema),
    defaultValues: {
      email: '',
      otp: '',
    },
  });

  const SetNewPasswordForm = useForm<SetNewPasswordFormInput>({
    resolver: zodResolver(SetNewPasswordFormSchema),
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  const newPassword = useWatch({
    name: 'password',
    control: SetNewPasswordForm.control,
  });

  const RequestEmailFormSubmit: SubmitHandler<
    RequestPasswordResetEmailFormInput
  > = async (data) => {
    try {
      await onRequestAction(data);

      OTPForm.setValue('email', data.email);

      setIsEmailSent(true);
    } catch (error) {
      console.error(
        'Request Password form error',
        JSON.stringify(error, null, 2),
      );

      RequestEmailForm.setError('root', {
        message:
          error instanceof Error ? error.message : 'Something went wrong!',
      });
    }
  };

  const OTPFormSubmit: SubmitHandler<RequestPasswordOTPFormInput> = async (
    data,
  ) => {
    try {
      await onVerifyOTPAction(data);

      SetNewPasswordForm.setValue('email', data.email);
      SetNewPasswordForm.setValue('otp', data.otp);

      setIsEmailSent(false);
      setIsVerified(true);
    } catch (error) {
      console.error('Verify OTP Form error', JSON.stringify(error, null, 2));

      OTPForm.setError('root', {
        message:
          error instanceof Error ? error.message : 'Something went wrong!',
      });
    }
  };

  const SetNewPasswordFormSubmit: SubmitHandler<
    SetNewPasswordFormInput
  > = async (data) => {
    try {
      await onSetNewPasswordAction(data);

      RequestEmailForm.reset();
      OTPForm.reset();
      SetNewPasswordForm.reset();

      setIsVerified(false);
      setIsEmailSent(false);
    } catch (error) {
      console.error('Set New Password form error', error);

      SetNewPasswordForm.setError('root', {
        message:
          error instanceof Error ? error.message : 'Something went wrong!',
      });
    }
  };

  return (
    <FormContainer>
      {RequestEmailForm.formState.errors.root && (
        <FieldError errors={[RequestEmailForm.formState.errors.root]} />
      )}

      {OTPForm.formState.errors.root && (
        <FieldError errors={[OTPForm.formState.errors.root]} />
      )}

      {SetNewPasswordForm.formState.errors.root && (
        <FieldError errors={[SetNewPasswordForm.formState.errors.root]} />
      )}

      {!isEmailSent && !isVerified && (
        <form
          className="flex flex-col gap-y-4"
          onSubmit={RequestEmailForm.handleSubmit(RequestEmailFormSubmit)}
        >
          <SectionTitle label="Reset Password" />

          <FormTextField
            name="email"
            type="email"
            autoComplete="email"
            control={RequestEmailForm.control}
            label="email"
          />

          <ArrowButton label="Reset Password" testId="request otp button" />
        </form>
      )}

      {isEmailSent && !isVerified && (
        <form
          onSubmit={OTPForm.handleSubmit(OTPFormSubmit)}
          className="flex flex-col gap-y-4 justify-center items-center"
        >
          <SectionTitle label="Verify Your OTP" />

          <Controller
            name="otp"
            control={OTPForm.control}
            render={({ field, fieldState }) => (
              <Field className="w-fit">
                <FieldLabel htmlFor="otp">
                  Enter your one-time password
                </FieldLabel>
                <InputOTP
                  id="otp"
                  pattern={REGEXP_ONLY_DIGITS}
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  className=""
                  aria-invalid={fieldState.invalid}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field className="w-fit self-end">
            <Button type="button" variant="link" onClick={() => OTPFormSubmit}>
              Resend OTP
            </Button>
          </Field>

          <ArrowButton label="Verify" testId="verify otp button" />
        </form>
      )}

      {!isEmailSent && isVerified && (
        <form
          onSubmit={SetNewPasswordForm.handleSubmit(SetNewPasswordFormSubmit)}
          className="flex flex-col gap-y-4"
        >
          <SectionTitle label="set new password" />

          <FormTextField
            name="password"
            label="New Password"
            control={SetNewPasswordForm.control}
            type="password"
            data-testid="new password input"
          />

          <FormTextField
            name="confirmPassword"
            label="Confirm New Password"
            control={SetNewPasswordForm.control}
            type="password"
          />

          <PasswordCheckList password={newPassword} />

          <ArrowButton
            label="Set New Passowrd"
            testId="set new password button"
          />
        </form>
      )}
    </FormContainer>
  );
};
