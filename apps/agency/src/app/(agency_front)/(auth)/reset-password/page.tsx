'use client';

import { authClient } from '@/lib/authClient';
import { Bounded, ResetPasswordForm, toast } from '@mnsart/ui';
import {
  RequestPasswordOTPFormInput,
  RequestPasswordResetEmailFormInput,
  SetNewPasswordFormInput,
} from '@mnsart/utils';
import { useRouter } from 'next/navigation';
import React from 'react';

const ResetPassword = (): React.JSX.Element => {
  const router = useRouter();

  const handleRequestEmail = async (
    data: RequestPasswordResetEmailFormInput,
  ) => {
    await authClient.emailOtp.requestPasswordReset(
      {
        email: data.email,
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleVerifyOTP = async (data: RequestPasswordOTPFormInput) => {
    await authClient.emailOtp.checkVerificationOtp(
      {
        email: data.email,
        otp: data.otp,
        type: 'forget-password',
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleSetNewPassword = async (data: SetNewPasswordFormInput) => {
    await authClient.emailOtp.resetPassword(
      {
        email: data.email,
        otp: data.otp,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success('Password updated!');
          router.push('/sign-in');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Bounded>
      <div className="max-w-2xl mx-auto">
        <ResetPasswordForm
          onRequestAction={handleRequestEmail}
          onVerifyOTPAction={handleVerifyOTP}
          onSetNewPasswordAction={handleSetNewPassword}
        />
      </div>
    </Bounded>
  );
};

export default ResetPassword;
