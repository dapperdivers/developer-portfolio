import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import SkillChip from './SkillChip';

const meta = {
  title: 'Molecules/SkillChip',
  component: SkillChip,
  tags: ['autodocs'],
  args: { name: 'Kubernetes', iconName: 'logos:kubernetes', onClick: fn() },
  argTypes: {
    name: { control: 'text' },
    iconName: { control: 'text' },
    selected: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
} satisfies Meta<typeof SkillChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Kubernetes' });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Selected: Story = { args: { selected: true } };

export const NoIcon: Story = { args: { iconName: undefined, name: 'Threat Modeling' } };

export const ReducedMotion: Story = { args: { animated: false } };
