import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionTitle } from './SectionTitle';
import { expect } from 'storybook/test';

const meta: Meta<typeof SectionTitle> = {
  title: 'Components/Shared/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      decription: {
        component: 'Title for separate sections on webpage',
      },
    },
  },

  args: { size: 'sm', label: 'Where art meets enginering' },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SectionTitle
      {...args}
      className="first-letter:font-cursive first-letter:text-brand-accent-400"
    />
  ),
  play: async ({ canvas }) => {
    const heading = canvas.getByText(/where art meets enginering/i);

    await expect(heading).toBeInTheDocument();
    await expect(heading?.tagName).toBe('H2');
  },
};

export const H3: Story = {
  render: (args) => (
    <SectionTitle
      {...args}
      as="h3"
      className="first-letter:font-cursive first-letter:text-brand-accent-400"
    />
  ),
  play: async ({ canvas }) => {
    const heading = canvas.getByText(/where art meets enginering/i);

    await expect(heading).toBeInTheDocument();
    await expect(heading?.tagName).toBe('H3');
  },
};
