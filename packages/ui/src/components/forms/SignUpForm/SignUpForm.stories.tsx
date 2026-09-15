import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignUpForm } from './SignUpForm';
import { expect, fn } from 'storybook/test';

const test = fn();
const testGoogle = fn();
const testGitHub = fn();

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/Forms/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Sign Up Form',
      },
    },
  },

  args: {
    OAuthAction: testGoogle,
    singInAction: {
      label: 'Sign In',
      href: '#',
    },
    onSubmit: test,
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SignUpForm
      {...args}
      renderSignIn={(props) => <a href={props.href}>{props.label}</a>}
    />
  ),
};

export const FilledForm: Story = {
  render: (args) => (
    <SignUpForm
      {...args}
      renderSignIn={(props) => <a href={props.href}>{props.label}</a>}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    const name = canvas.getByLabelText(/full name/i);
    const email = canvas.getByLabelText(/email/i);
    const password = canvas.getByLabelText('Password');
    const confirmPassword = canvas.getByLabelText(/confirm password/i);
    const submit = canvas.getByText('Sign Up Now');

    await expect(name).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
    await expect(password).toBeInTheDocument();
    await expect(confirmPassword).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(name, 'John Doe');
    await userEvent.type(email, 'johndoe@mail.com');
    await userEvent.type(password, '$ecreT123');
    await userEvent.type(confirmPassword, '$ecreT123');
    await userEvent.click(submit);

    await expect(test).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '$ecreT123',
      confirmPassword: '$ecreT123',
    });
  },
};

export const GoogleOAuth: Story = {
  render: (args) => (
    <SignUpForm
      {...args}
      renderSignIn={(props) => <a href={props.href}>{props.label}</a>}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    const google = canvas.getByRole('button', {
      name: /continue with google/i,
    });

    await expect(google).toBeInTheDocument();

    await userEvent.click(google);

    await expect(testGoogle).toHaveBeenCalled();
  },
};

export const GitHubOAuth: Story = {
  render: (args) => (
    <SignUpForm
      {...args}
      OAuthAction={testGitHub}
      renderSignIn={(props) => <a href={props.href}>{props.label}</a>}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    const github = canvas.getByRole('button', {
      name: /continue with github/i,
    });

    await expect(github).toBeInTheDocument();

    await userEvent.click(github);

    await expect(testGitHub).toHaveBeenCalled();
  },
};
