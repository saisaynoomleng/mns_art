import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterForm } from './NewsletterForm';
import { mockAction } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof NewsletterForm> = {
  title: 'Components/Forms/NewsletterForm',
  component: NewsletterForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Newsletter Subscription Form',
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

export const Default: Story = {
  render: (args) => <NewsletterForm {...args} />,
  play: async ({ canvas }) => {
    const email = canvas.getByLabelText(/email/i);
    const submit = canvas.getByRole('button', {
      name: /subscribe/i,
    });

    await expect(email).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();
  },
};

export const FilledForm: Story = {
  render: (args) => <NewsletterForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    const email = canvas.getByLabelText(/email/i);
    const submit = canvas.getByRole('button', {
      name: /subscribe/i,
    });

    await expect(email).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(email, 'johndoe@example.com');
    await userEvent.click(submit);

    await expect(mockAction).toHaveBeenCalledWith({
      email: 'johndoe@example.com',
    });
  },
};
