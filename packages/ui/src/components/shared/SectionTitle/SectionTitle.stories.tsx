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
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    label: {
      control: 'text',
      description: 'Section title text',
    },

    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Default font sizes for the headings',
          detail: `
              sm: 'text-fs-500 md:text-fs-600 lg:text-fs-700',
              md: 'text-fs-600 md:text-fs-700 lg:text-fs-800',
              lg: 'text-fs-700 md:text-fs-800 lg:text-fs-900',
          `,
        },
      },
    },

    as: {
      control: 'radio',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Semantic headings to be rendered, default to h3',
    },
  },
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
