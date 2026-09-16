import type { Meta, StoryObj } from '@storybook/react-vite';
import { CarePlanCard } from './CarePlanCard';
import { mockCarePlan } from '#lib/mockData';

const meta: Meta<typeof CarePlanCard> = {
  title: 'Components/Shared/CarePlanCard',
  component: CarePlanCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Display Care Plan Summary',
      },
    },
  },

  args: {
    name: mockCarePlan.name,
    excerpt: mockCarePlan.excerpt,
    pricePerMonth: mockCarePlan.price,
    inclusives: mockCarePlan.inclusives,
    action: {
      label: 'Check Detail',
      href: '#',
    },
    isPremium: true,
    exclusives: mockCarePlan.exclusives,
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <CarePlanCard
      {...args}
      renderAction={(props) => (
        <a className="relative z-20" href={props.href}>
          {props.label}
        </a>
      )}
    />
  ),
};
