import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { within, expect, userEvent } from 'storybook/test';
import Greetings from './Greetings';
import PortfolioContext from '@context/PortfolioContext';
import { siteData } from '../storyFixtures';
import type { Greeting, PortfolioData } from '@/types/portfolio';

// Helper function to create context with custom greeting data
const createContextWithGreetings = (greetingsData: Greeting): Decorator => {
  const customContext: PortfolioData = { ...siteData, greetings: greetingsData };
  return (Story) => (
    <PortfolioContext.Provider value={customContext}>
      <Story />
    </PortfolioContext.Provider>
  );
};

// The real greeting from the site data
const derek: Greeting = siteData.greetings;

const meta = {
  title: 'Organisms/Greetings',
  component: Greetings,
  tags: ['autodocs'],
  decorators: [createContextWithGreetings(derek)],
  parameters: {
    docs: {
      description: {
        component:
          'Hero section built as a terminal. It types a short whoami sequence (any key or click skips it; reduced motion shows it at once) and leaves an interactive prompt. Commands: help, whoami, ls (ls -a), cd/open <section>, cat resume, contact, uptime, ping, clear, sudo hire derek. The h1, a Download Resume button and the scroll cue stay visible for people who never type.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Greetings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Heading, resume button and scroll cue are present while it types', async () => {
      await expect(canvas.getByTestId('greeting-heading')).toHaveTextContent("Hi There, I'm Derek Mackley");
      await expect(canvas.getByText('Download Resume')).toBeInTheDocument();
      await expect(canvas.getByLabelText('>>_NEXT')).toHaveClass('scroll-down-container');
    });

    await step('A click skips the typing and shows the prompt', async () => {
      await userEvent.click(canvasElement);
      await expect(await canvas.findByLabelText(/Terminal command/)).toBeInTheDocument();
      await expect(canvas.getByText(/Principal Security Engineer, Canton, GA/)).toBeInTheDocument();
    });

    await step('The hero has no social icon row', async () => {
      await expect(canvas.queryByLabelText('GitHub Profile')).not.toBeInTheDocument();
    });
  },
};

/** Types commands at the prompt. */
export const TypeCommands: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvasElement);
    const input = await canvas.findByLabelText(/Terminal command/);

    await step('help lists the commands', async () => {
      await userEvent.type(input, 'help{Enter}');
      await expect(await canvas.findByText(/cat resume/)).toBeInTheDocument();
    });

    await step('ls -a reveals the hidden entry and cat points at the timeline', async () => {
      await userEvent.type(input, 'ls -a{Enter}');
      await expect(await canvas.findByText(/\.secrets/)).toBeInTheDocument();
      await userEvent.type(input, 'cat .secrets{Enter}');
      await expect(await canvas.findByText(/timeline card/i)).toBeInTheDocument();
    });

    await step('an unknown command gets a friendly answer', async () => {
      await userEvent.type(input, 'frobnicate{Enter}');
      await expect(await canvas.findByText(/frobnicate: command not found/)).toBeInTheDocument();
    });

    await step('clear empties the log but keeps the prompt', async () => {
      await userEvent.type(input, 'clear{Enter}');
      await expect(canvas.queryByText(/command not found/)).not.toBeInTheDocument();
      await expect(input).toBeInTheDocument();
    });
  },
};

/** The quick-command buttons help touch screens, where typing is clumsy. */
export const QuickCommands: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'ls' }));
    await expect(await canvas.findByText(/experience\//)).toBeInTheDocument();
  },
};

export const LongContent: Story = {
  decorators: [
    createContextWithGreetings({
      ...derek,
      description:
        `${derek.description} ${derek.description}`,
    }),
  ],
};

export const MissingOptionalFields: Story = {
  decorators: [
    createContextWithGreetings({
      name: 'Alex Example',
      title: 'Hello World!',
      description: 'Frontend developer and UI/UX enthusiast.',
    }),
  ],
};

// Mobile viewport story: the hero must clear the fixed navigation
export const Mobile: Story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};

// Tablet viewport story
export const Tablet: Story = {
  globals: {
    viewport: { value: 'tablet', isRotated: false },
  },
};
