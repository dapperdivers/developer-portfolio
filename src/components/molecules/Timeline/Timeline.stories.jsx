import React, { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { placeholderImage } from '@stories-utils/placeholderImage';
import Timeline from './Timeline';
import TimelineEasterEggOverlay from './TimelineEasterEggOverlay';
import useTimelineEasterEggs from './useTimelineEasterEggs';

const experiences = [
  {
    role: 'Staff Product Security Engineer',
    company: 'Northwind Freight',
    companylogo: placeholderImage(96, 96, { label: 'NF' }),
    date: 'July 2023 – Present',
    desc: 'Sets the technical direction for a newly formed product security team and runs the vulnerability management program.',
    descBullets: [
      'Built a vulnerability aggregation service that merges findings from open-source and commercial scanners',
      'Added pull request checks for secrets, vulnerable packages and outdated base images',
      'Published security metrics dashboards used in quarterly planning',
    ],
  },
  {
    role: 'Senior Software Engineering Manager',
    company: 'Northwind Freight',
    companylogo: placeholderImage(96, 96, { label: 'NF' }),
    date: 'May 2022 – July 2023',
    desc: 'Managed a product engineering team through an architecture redesign.',
    descBullets: ['Introduced threat modelling into design reviews', 'Set up the on-call rotation and incident review process'],
  },
  {
    role: 'Lead Software Engineer',
    company: 'Example Cloud Co',
    companylogo: placeholderImage(96, 96, { label: 'EC', accent: 'green' }),
    date: 'January 2020 – May 2022',
    desc: 'Led development of cloud-native services for enterprise customers.',
    descBullets: ['Designed the service-to-service authentication model', 'Mentored four engineers into senior roles'],
  },
];

const withSurface = (Story) => (
  <div className="w-full max-w-6xl mx-auto bg-gray-900 p-8 rounded-lg border border-gray-700">
    <Story />
  </div>
);

export default {
  title: 'Molecules/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  decorators: [withSurface],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Vertical timeline of roles, alternating either side of a centre line. It is a props-only block: the parent owns which cards are open, and the hidden extras (matrix, glitch and hack effects) are switched on through the `effects` prop. `useTimelineEasterEggs` supplies those props from clicks and key presses; see the "With easter eggs" story.',
      },
    },
  },
  args: {
    experiences,
    expandedCards: new Set([0]),
    variant: 'default',
    animated: true,
    onCardToggle: fn(),
  },
  argTypes: {
    experiences: { control: 'object', description: 'Roles to show, newest first' },
    expandedCards: { control: false, description: 'Set of indices of the open cards' },
    variant: { control: 'select', options: ['default', 'secure', 'breach', 'critical'], description: 'Colour variant' },
    animated: { control: 'boolean', description: 'Play the entrance animation' },
    effects: { control: 'object', description: 'Easter-egg effects: matrix, glitch, hack, shake' },
    clickCounts: { control: 'object', description: 'Clicks per card index; changes the status wording' },
    timeOfDay: { control: 'select', options: ['', 'night-mode', 'lunch-break', 'work-hours'], description: 'Optional ambience' },
  },
};

export const Default = {};

export const AllCollapsed = {
  args: { expandedCards: new Set() },
};

export const AllExpanded = {
  args: { expandedCards: new Set([0, 1, 2]) },
};

export const SingleExperience = {
  args: { experiences: experiences.slice(0, 1) },
};

export const Empty = {
  args: { experiences: [] },
};

export const Secure = { args: { variant: 'secure' } };
export const Breach = { args: { variant: 'breach' } };
export const Critical = { args: { variant: 'critical' } };

export const WithoutAnimation = {
  args: { animated: false },
};

/** The parent owns the open/closed state. Cards toggle with a click, Enter or Space. */
export const Interactive = {
  render: function Render(args) {
    const [expanded, setExpanded] = useState(new Set([0]));
    const toggle = (index) => {
      args.onCardToggle(index);
      setExpanded((current) => {
        const next = new Set(current);
        if (next.has(index)) next.delete(index);
        else next.add(index);
        return next;
      });
    };
    return <Timeline {...args} expandedCards={expanded} onCardToggle={toggle} />;
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const cards = canvas.getAllByRole('button');

    await step('First card starts open, the others closed', async () => {
      await expect(cards[0]).toHaveAttribute('aria-expanded', 'true');
      await expect(cards[1]).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Clicking a closed card opens it', async () => {
      await userEvent.click(cards[1]);
      await expect(args.onCardToggle).toHaveBeenCalledWith(1);
      await waitFor(() => expect(cards[1]).toHaveAttribute('aria-expanded', 'true'));
    });

    await step('Enter closes it again from the keyboard', async () => {
      cards[1].focus();
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(cards[1]).toHaveAttribute('aria-expanded', 'false'));
    });
  },
};

/** Effects are plain props, so each mode can be shown on its own. */
export const MatrixEffect = {
  args: { effects: { matrix: true } },
};

export const GlitchEffect = {
  args: { effects: { glitch: true } },
};

export const HackEffect = {
  args: { effects: { hack: true }, clickCounts: { 0: 7 } },
};

/**
 * The full hidden-extras behaviour, wired the way the Experience section wires
 * it. Click one card three times to arm it, then five and seven times, or try
 * the Konami code, Ctrl+Shift+D and Alt+H.
 */
export const WithEasterEggs = {
  render: function Render(args) {
    const [expanded, setExpanded] = useState(new Set([0]));
    const eggs = useTimelineEasterEggs();
    const toggle = (index) => {
      eggs.registerClick(index);
      setExpanded((current) => {
        const next = new Set(current);
        if (next.has(index)) next.delete(index);
        else next.add(index);
        return next;
      });
    };
    return (
      <>
        <TimelineEasterEggOverlay
          secretMessage={eggs.secretMessage}
          achievements={eggs.achievements}
          onDismissAchievement={eggs.dismissAchievement}
          mouseTrail={eggs.mouseTrail}
        />
        <Timeline {...args} expandedCards={expanded} onCardToggle={toggle} effects={eggs.effects} clickCounts={eggs.clickCounts} />
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const card = canvas.getAllByRole('button')[0];

    await step('Nothing happens on the first two clicks', async () => {
      await userEvent.click(card);
      await userEvent.click(card);
      await expect(canvas.queryByText(/SYSTEM BREACH DETECTED/)).not.toBeInTheDocument();
    });

    await step('The third click arms the extras', async () => {
      await userEvent.click(card);
      // Both fade in, so wait for them to finish appearing
      const banner = await canvas.findByText(/SYSTEM BREACH DETECTED/);
      await waitFor(() => expect(banner).toBeVisible());
      const toast = await canvas.findByText(/TRIPLE CLICKER/);
      await waitFor(() => expect(toast).toBeVisible());
    });
  },
};
