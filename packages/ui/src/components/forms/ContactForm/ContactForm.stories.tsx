import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactForm } from './ContactForm';
import { mockAction } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof ContactForm> = {
  title: 'Components/Forms/ContactForm',
  component: ContactForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Contact Form',
      },
    },
  },

  args: {
    action: mockAction,
  },
  argTypes: {
    action: {
      control: false,
      description: 'Server Action to be rendered in Next.js',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <ContactForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    const name = canvas.getByLabelText(/name/i);
    const email = canvas.getByLabelText(/email/i);
    const minBudget = canvas.getByLabelText(/minimum budget/i);
    const maxBudget = canvas.getByLabelText(/maximum budget/i);
    const service = canvas.getByLabelText(/service/i);
    const message = canvas.getByLabelText(/message/i);
    const submit = canvas.getByRole('button', {
      name: /notify us/i,
    });

    await expect(name).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
    await expect(minBudget).toBeInTheDocument();
    await expect(maxBudget).toBeInTheDocument();
    await expect(service).toBeInTheDocument();
    await expect(message).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(name, 'John Doe');
    await userEvent.type(email, 'johndoe@example.com');
    await userEvent.clear(minBudget);
    await userEvent.clear(maxBudget);
    await userEvent.type(minBudget, '500');
    await userEvent.type(maxBudget, '1000');
    await userEvent.type(message, 'I want to build my idea');
    await userEvent.click(submit);

    await expect(mockAction).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      minBudget: 500,
      maxBudget: 1000,
      service: 'web-development',
      message: 'I want to build my idea',
    });
  },
};
