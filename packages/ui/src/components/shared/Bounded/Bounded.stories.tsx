import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bounded } from './Bounded';
import { expect } from 'storybook/test';

const meta: Meta<typeof Bounded> = {
  title: 'Components/Shared/Bounded',
  component: Bounded,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },

  args: {
    padding: 'sm',
    spacing: 'none',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    as: {
      control: 'text',
      description: 'HTML Element Wrapper. Default to Section',
    },

    padding: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Default inline padding, default to small',
          detail: `none: '',
                  sm: 'px-4 md:px-6 lg:px-8',
                  md: 'px-6 md:px-8 lg:px-10',
                  lg: 'px-8 md:px-10 lg:px-12',`,
        },
      },
    },

    spacing: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Default vertical spacing, default to none',
          detail: `none: '',
                  sm: 'space-y-6 md:space-y-8 lg:space-y-10',
                  md: 'space-y-8 md:space-y-10 lg:space-y-12',
                  lg: 'space-y-10 md:space-y-12 lg:space-y-16'`,
        },
      },
    },

    children: {
      control: false,
      description: 'React Node',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Bounded {...args}>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita,
        numquam?
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        odio temporibus adipisci reprehenderit consequatur deserunt sint
        aliquam, magni ad quis?
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
        voluptates quaerat repellat sequi rerum adipisci laborum quidem.
        Quibusdam fugit omnis sunt enim perferendis nisi rem sequi maxime! Iure
        veniam quos ullam magni ipsam! Eum adipisci aliquam dolore, cum illum
        modi reiciendis, molestiae vero ipsa repellendus illo, animi deserunt
        eos voluptatem?
      </p>
    </Bounded>
  ),
  play: async ({ canvas }) => {
    const bounded = canvas.getByTestId('wrapper');
    const para = canvas.getAllByRole('paragraph');

    await expect(bounded).toBeInTheDocument();
    await expect(bounded?.tagName).toBe('SECTION');
    await expect(para).toHaveLength(3);
  },
};

export const Main: Story = {
  render: (args) => (
    <Bounded spacing="md" as="main">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias laborum
        atque deleniti fuga quia vero maiores laboriosam magnam adipisci
        ratione?
      </p>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, aut!</p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A minima
        aliquam, voluptas debitis suscipit, ipsum pariatur voluptates itaque
        ratione eaque temporibus culpa, nam ea ex repellendus natus. Aliquam,
        tenetur tempora?
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        enim repellendus obcaecati ducimus harum sapiente? Alias similique
        minus, esse temporibus vitae delectus ipsum nobis fugiat doloremque hic
        explicabo doloribus nihil?
      </p>
    </Bounded>
  ),
  play: async ({ canvas }) => {
    const bounded = canvas.getByTestId('wrapper');
    const para = canvas.getAllByRole('paragraph');

    await expect(bounded).toBeInTheDocument();
    await expect(bounded?.tagName).toBe('MAIN');
    await expect(para).toHaveLength(4);
  },
};
