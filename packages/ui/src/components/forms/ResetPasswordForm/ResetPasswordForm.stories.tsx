import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResetPasswordForm } from './ResetPasswordForm';
import { expect, fn, userEvent } from 'storybook/test';

const meta: Meta<typeof ResetPasswordForm> = {
  title: 'Components/Forms/ResetPasswordForm',
  component: ResetPasswordForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Reset Password with email OTP form',
      },
    },
  },

  args: {
    onRequestAction: fn(),
    onVerifyOTPAction: fn(),
    onSetNewPasswordAction: fn(),
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ResendOTP: Story = {
  render: (args) => <ResetPasswordForm {...args} />,

  play: async ({ canvas, userEvent, args }) => {
    const email = canvas.getByLabelText('email');
    const requestBtn = canvas.getByTestId('request otp button');

    await expect(email).toBeInTheDocument();
    await expect(requestBtn).toBeInTheDocument();

    await userEvent.type(email, 'johndoe@mail.com');
    await userEvent.click(requestBtn);

    await expect(args.onRequestAction).toHaveBeenCalledTimes(1);

    const resendBtn = canvas.getByRole('button', {
      name: /resend otp/i,
    });

    await expect(resendBtn).toBeInTheDocument();

    await userEvent.click(resendBtn);

    await expect(args.onRequestAction).toHaveBeenCalledTimes(1);

    await expect(args.onRequestAction).toHaveBeenCalledWith({
      email: 'johndoe@mail.com',
    });
  },
};

export const FilledForm: Story = {
  render: (args) => <ResetPasswordForm {...args} />,

  play: async ({ canvas, userEvent, args }) => {
    const email = canvas.getByLabelText('email');
    const requestBtn = canvas.getByTestId('request otp button');

    await expect(email).toBeInTheDocument();
    await expect(requestBtn).toBeInTheDocument();

    await userEvent.type(email, 'johndoe@mail.com');
    await userEvent.click(requestBtn);

    const otp = canvas.getByLabelText(/enter your one-time password/i);
    const verityBtn = canvas.getByTestId('verify otp button');

    await expect(otp).toBeInTheDocument();
    await expect(verityBtn).toBeInTheDocument();

    await userEvent.type(otp, '123456');
    await userEvent.click(verityBtn);

    const password = canvas.getByTestId('new password input');
    const confirmPassword = canvas.getByLabelText(/confirm new password/i);
    const newPasswordBtn = canvas.getByTestId('set new password button');

    await expect(password).toBeInTheDocument();
    await expect(confirmPassword).toBeInTheDocument();
    await expect(newPasswordBtn).toBeInTheDocument();

    await userEvent.type(password, 'Pas$word123');
    await userEvent.type(confirmPassword, 'Pas$word123');
    await userEvent.click(newPasswordBtn);

    await expect(args.onSetNewPasswordAction).toHaveBeenCalledWith({
      email: 'johndoe@mail.com',
      otp: '123456',
      password: 'Pas$word123',
      confirmPassword: 'Pas$word123',
    });
  },
};
