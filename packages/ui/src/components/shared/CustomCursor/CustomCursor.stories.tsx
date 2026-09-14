import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomCursor } from './CustomCursor';

const meta: Meta<typeof CustomCursor> = {
  title: 'Components/Shared/CustomCursor',
  component: CustomCursor,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Custom Cursor',
      },
    },
  },

  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
