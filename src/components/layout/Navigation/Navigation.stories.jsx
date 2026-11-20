import React from 'react';
import Navigation from './Navigation';
import { within, userEvent, expect, waitFor } from 'storybook/test';

export default {
  title: 'Layout/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Fixed site header showing the name and, from the `lg` breakpoint up, the social links. ' +
          'It takes no props: the name comes from `PortfolioContext` and the scroll behaviour from the `useNavigation` hook. ' +
          'The header is transparent at the top of the page, gains a blurred backdrop once the page has scrolled, ' +
          'and slides out of view when scrolling down past the hero section (`#greetings`), returning on scroll up.',
      },
      // The header is position: fixed, so each docs story gets its own iframe
      story: { inline: false, height: '400px' },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-roles',
            enabled: true
          },
          {
            id: 'button-name',
            enabled: true
          },
          {
            id: 'color-contrast',
            enabled: true
          }
        ],
      },
    },
    layout: 'fullscreen',
  },
};

// Height of the mock hero. The header only hides once the page has scrolled past it.
const HERO_HEIGHT = 600;

const pageSections = [
  ['Experience', 'Roles, responsibilities and the security programmes built along the way.'],
  ['Projects', 'Tooling, detection content and infrastructure work.'],
  ['Contact', 'How to get in touch.'],
];

// Mock page behind the header: a hero with the id the scroll logic looks for,
// then enough content to scroll through.
const withBackground = (Story) => (
  <div style={{ background: 'linear-gradient(#0a192f, #162b3d)', color: 'white' }}>
    <Story />
    <section
      id="greetings"
      style={{ height: `${HERO_HEIGHT}px`, padding: '140px 24px 0', boxSizing: 'border-box' }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Security engineer</h1>
      <p>Scroll the page: the header gains a backdrop, hides on the way down and returns on the way up.</p>
    </section>
    {pageSections.map(([title, text]) => (
      <section
        key={title}
        style={{ height: '500px', padding: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
      >
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h2>
        <p>{text}</p>
      </section>
    ))}
  </div>
);

// Decorator that scrolls the story page to a position on mount
const scrolledTo = (y) => (Story) => {
  React.useEffect(() => {
    window.scrollTo({ top: y, behavior: 'instant' });
    return () => window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return <Story />;
};

// Template for the component
const Template = (args) => <Navigation {...args} />;

// Default story - Navigation in its default state
export const Default = Template.bind({});
Default.decorators = [withBackground];
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('Initial render check', async () => {
    // Check navbar exists
    const navbar = canvas.getByRole('navigation');
    await expect(navbar).toBeInTheDocument();

    // Check brand name
    const brandText = canvas.getByText('Derek Mackley');
    await expect(brandText).toBeInTheDocument();
  });
};

// Scrolled state: still inside the hero, so the header stays and gains its backdrop
export const Scrolled = Template.bind({});
Scrolled.decorators = [scrolledTo(200), withBackground];
Scrolled.parameters = {
  docs: {
    description: {
      story: 'The page has scrolled 200px, still within the hero. The header stays in place and gains a blurred dark backdrop.',
    },
  },
};
Scrolled.play = async ({ canvasElement }) => {
  const header = within(canvasElement).getByRole('banner');
  await waitFor(() => expect(header.className).toContain('backdrop-blur-md'));
};

// Hidden state: scrolled down past the hero, so the header slides out of view
export const Hidden = Template.bind({});
Hidden.decorators = [scrolledTo(HERO_HEIGHT + 300), withBackground];
Hidden.parameters = {
  docs: {
    description: {
      story: 'The page has scrolled down past the hero, so the header has moved out of view. Scroll up to bring it back.',
    },
  },
};
Hidden.play = async ({ canvasElement }) => {
  const header = within(canvasElement).getByRole('banner');
  // The scroll handler has run once the backdrop class is applied
  await waitFor(() => expect(header.className).toContain('backdrop-blur-md'));
  await waitFor(() => expect(header.style.transform).toContain('-100px'));
};

// Mobile viewport version
export const Mobile = Template.bind({});
Mobile.decorators = [withBackground];
Mobile.globals = {
  viewport: { value: 'mobile1', isRotated: false },
};
Mobile.parameters = {
  docs: {
    description: {
      story: 'Below the `lg` breakpoint the social links are hidden and only the name is shown.',
    },
  },
};

// With keyboard navigation
export const KeyboardNavigation = Template.bind({});
KeyboardNavigation.decorators = [withBackground];
KeyboardNavigation.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step('Focus navigation with keyboard', async () => {
    const navbar = canvas.getByRole('navigation');
    // Role queries skip hidden elements. The social links are the only
    // interactive elements and are hidden below the lg breakpoint.
    const links = within(navbar).queryAllByRole('link');

    await userEvent.tab();

    if (links.length > 0) {
      await expect(navbar.contains(document.activeElement)).toBeTruthy();
    } else {
      await expect(navbar.contains(document.activeElement)).toBeFalsy();
    }
  });
};
