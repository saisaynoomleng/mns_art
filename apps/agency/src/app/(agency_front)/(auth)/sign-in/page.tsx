'use client';

import { RenderAction } from '@/components/RenderAction';
import { authClient } from '@/lib/authClient';
import { Bounded, SignInForm, toast } from '@mnsart/ui';
import { OAuthProviders, SignInFormInput } from '@mnsart/utils';

const SignInPage = () => {
  const handleSignIn = async (data: SignInFormInput) => {
    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
          callbackURL: '/user',
        },
        {
          onSuccess: () => {
            toast.success('Sign In Successful');
          },

          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error('Sign In Form Error', JSON.stringify(error, null, 2));
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
        <SignInForm
          onSubmit={handleSignIn}
          OAuthAction={handleOAuth}
          singUpAction={{ label: 'Sign Up', href: '/sign-up' }}
          renderSignUp={({ label, href }) => RenderAction({ label, href })}
          forgetPasswordAction={{
            label: 'Forget Password',
            href: '/reset-password',
          }}
          renderForgetPassword={({ label, href }) =>
            RenderAction({ label, href })
          }
        />
      </div>
    </Bounded>
  );
};

export default SignInPage;
