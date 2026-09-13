import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button Element',
      },
    },
  },

  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Button {...args}>let&apos;s talk</Button>,
};
