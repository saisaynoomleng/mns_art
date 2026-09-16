import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignInForm } from './SignInForm';
import { expect, fn } from 'storybook/test';

const meta: Meta<typeof SignInForm> = {
  title: 'Components/Forms/SignInForm',
  tags: ['autodocs'],
  component: SignInForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Sign In Form',
      },
    },
  },

  args: {
    forgetPasswordAction: {
      label: 'Forget Your Password?',
      href: '#',
    },
    singUpAction: {
      label: 'Sign Up',
      href: '#',
    },
    onSubmit: fn(),
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SignInForm
      {...args}
      renderForgetPassword={(props) => <a href={props.label}>{props.label}</a>}
      renderSignUp={(props) => <a href={props.label}>{props.label}</a>}
    />
  ),
};

export const FilledForm: Story = {
  render: (args) => (
    <SignInForm
      {...args}
      renderForgetPassword={(props) => <a href={props.label}>{props.label}</a>}
      renderSignUp={(props) => <a href={props.label}>{props.label}</a>}
    />
  ),
  play: async ({ canvas, userEvent, args }) => {
    const submit = canvas.getByTestId('sign in');
    const email = canvas.getByLabelText(/email/i);
    const password = canvas.getByLabelText(/password/i);
    const remember = canvas.getByLabelText(/remember me/i);

    await expect(submit).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
    await expect(password).toBeInTheDocument();
    await expect(remember).toBeInTheDocument();

    await userEvent.type(email, 'johndoe@mail.com');
    await userEvent.type(password, 'secret');
    await userEvent.click(remember);
    await userEvent.click(submit);

    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: 'johndoe@mail.com',
      password: 'secret',
      rememberMe: true,
    });
  },
};
