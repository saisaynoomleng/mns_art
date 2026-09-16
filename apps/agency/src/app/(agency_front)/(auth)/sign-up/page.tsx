'use client';

import { RenderAction } from '@/components/RenderAction';
import { authClient } from '@/lib/authClient';
import { Bounded, SignUpForm, toast } from '@mnsart/ui';
import { OAuthProviders, SignUpFormInput } from '@mnsart/utils';

const SignUpPage = () => {
  const handleSubmit = async (data: SignUpFormInput) => {
    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: '/user',
        },
        {
          onSuccess: () => {
            toast.success('Sign Up Successful!');
          },

          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error('Sign Up error', JSON.stringify(error, null, 2));
    }
  };

  const handleOAuth = async (provider: OAuthProviders) => {
    await authClient.signIn.social({
      provider,
    });
  };

  return (
    <Bounded>
      <div className="max-w-2xl mx-auto">
        <SignUpForm
          onSubmit={handleSubmit}
          renderSignIn={({ label, href }) => RenderAction({ label, href })}
          singInAction={{ label: 'Sign In', href: '/sign-in' }}
          OAuthAction={handleOAuth}
        />
      </div>
    </Bounded>
  );
};

export default SignUpPage;
