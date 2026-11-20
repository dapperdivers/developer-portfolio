import type { Meta, StoryObj } from '@storybook/react-vite';
import DateChip from './DateChip';

const meta = {
  title: 'Atoms/DateChip',
  component: DateChip,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A date or duration chip',
    docs: {
      description: {
        component:
          'A chip-family pill for dates and durations: --radius-chip, --surface-inset fill, 1px border, JetBrains Mono xs text. Variants only change the tone: default cyan, secure green, breach amber, critical red.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    animated: { control: 'boolean', description: 'Whether the chip fades in on mount' },
    date: { control: 'text', description: 'The date or duration text to display' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical'],
      description: 'Tone of the chip',
    },
    className: { control: 'text', description: 'Additional CSS classes' },
  },
} satisfies Meta<typeof DateChip>;

export default meta;
type Story = StoryObj<typeof meta>;
// Showcase stories render fixed examples and take no args.
type ShowcaseStory = StoryObj<typeof DateChip>;

export const Default: Story = {
  args: { date: '2020 - 2024', variant: 'default' },
};

export const Variants: ShowcaseStory = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <DateChip date="2020 - Present" variant="default" />
      <DateChip date="Verified 2025" variant="secure" />
      <DateChip date="Incident 2024" variant="breach" />
      <DateChip date="Critical 2024" variant="critical" />
    </div>
  ),
};

export const Formats: ShowcaseStory = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <DateChip date="2024" />
      <DateChip date="Jan 2022 - Present" />
      <DateChip date="3 yrs 4 mos" />
      <DateChip date="Q4 2025" />
    </div>
  ),
};

export const WithoutAnimation: Story = {
  args: { date: '2022 - Present', animated: false },
};
