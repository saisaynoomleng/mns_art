import type { Meta, StoryObj } from '@storybook/react-vite';
import { CapabilityCard } from './CapabilityCard';

const meta: Meta<typeof CapabilityCard> = {
  title: 'Components/Shared/CapabilityCard',
  component: CapabilityCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Capability Progress Display Cards',
      },
    },
  },

  args: {
    name: 'Animation',
    value: 88,
    bgColor: '#0e79b2',
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <CapabilityCard {...args} />,
};

export const SEO: Story = {
  render: (args) => (
    <CapabilityCard
      {...args}
      name="SEO"
      value={99}
      bgColor="#f07c1f"
      textColor="#191923"
    />
  ),
};

export const Conversion: Story = {
  render: (args) => (
    <CapabilityCard
      {...args}
      name="Conversion"
      value={75}
      bgColor="#f143a2"
      textColor="#191923"
    />
  ),
};

export const Speed: Story = {
  render: (args) => (
    <CapabilityCard
      {...args}
      name="Conversion"
      value={75}
      bgColor="#3d7c3e"
      textColor="#fbfef9"
    />
  ),
};
