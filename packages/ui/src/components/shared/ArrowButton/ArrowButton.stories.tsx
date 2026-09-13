import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowButton } from './ArrowButton';
import { expect } from 'storybook/test';

const meta: Meta<typeof ArrowButton> = {
  title: 'Components/Shared/ArrowButton',
  component: ArrowButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button With Arrow Animation',
      },
    },
  },

  args: {
    label: 'Explore More!',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text',
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
  render: (args) => <ArrowButton {...args} />,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', {
      name: /explore more/i,
    });

    await expect(button).toBeInTheDocument();
  },
};
