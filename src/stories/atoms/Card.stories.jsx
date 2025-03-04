import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether the card has hover effects',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the card has a border',
    },
    shadow: {
      control: 'boolean',
      description: 'Whether the card has a shadow',
    },
    header: {
      control: { disable: true },
      description: 'Custom header content',
    },
    footer: {
      control: { disable: true },
      description: 'Custom footer content',
    },
    animation: {
      control: { disable: true },
      description: 'Framer Motion animation properties',
    },
  },
};

export default meta;

// Default render function for most stories
const DefaultRender = (args) => (
  <div style={{ maxWidth: '350px' }}>
    <Card {...args}>
      <p>This is the content of the card. You can add any elements or components here.</p>
    </Card>
  </div>
);

// Default card
export const Default = {
  render: DefaultRender,
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    bordered: true,
    shadow: false,
    hoverable: false,
  }
};

// Card with hover effect
export const Hoverable = {
  render: DefaultRender,
  args: {
    title: 'Hoverable Card',
    subtitle: 'This card has a hover effect',
    hoverable: true,
    bordered: true,
  }
};

// Card with shadow
export const WithShadow = {
  render: DefaultRender,
  args: {
    title: 'Card With Shadow',
    shadow: true,
  }
};

// Borderless card
export const Borderless = {
  render: DefaultRender,
  args: {
    title: 'Borderless Card',
    bordered: false,
    shadow: true,
  }
};

// Card with custom header
export const CustomHeader = {
  render: (args) => (
    <div style={{ maxWidth: '350px' }}>
      <Card
        {...args}
        header={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Custom Header</h3>
            <Button size="sm" variant="primary">Action</Button>
          </div>
        }
      >
        <p>This card has a custom header with a button.</p>
      </Card>
    </div>
  )
};

// Card with footer
export const WithFooter = {
  render: (args) => (
    <div style={{ maxWidth: '350px' }}>
      <Card
        {...args}
        title="Card With Footer"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button size="sm" variant="secondary">Cancel</Button>
            <Button size="sm" variant="primary">Submit</Button>
          </div>
        }
      >
        <p>This card has a footer with action buttons.</p>
      </Card>
    </div>
  )
};

// Card with animation
export const WithAnimation = {
  render: (args) => (
    <div style={{ maxWidth: '350px' }}>
      <Card
        {...args}
        title="Animated Card"
        subtitle="This card uses Framer Motion animations"
        animation={{
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
        }}
      >
        <p>This card animates when it appears on the screen.</p>
      </Card>
    </div>
  )
};

// Grid of cards
export const CardGrid = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <Card title="Card 1" shadow hoverable>
        <p>This is card 1 content.</p>
      </Card>
      <Card title="Card 2" shadow hoverable>
        <p>This is card 2 content.</p>
      </Card>
      <Card title="Card 3" shadow hoverable>
        <p>This is card 3 content.</p>
      </Card>
      <Card title="Card 4" shadow hoverable>
        <p>This is card 4 content.</p>
      </Card>
    </div>
  )
};
