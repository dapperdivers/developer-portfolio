import React from 'react';
import ProfileLocation from './ProfileLocation';
import { withAnimationContext } from '@stories-utils';

// Mock the MapComponent
jest.mock('@molecules/MapComponent', () => {
  return function MockMapComponent({ location }) {
    return (
      <div 
        style={{ 
          height: '300px', 
          background: 'linear-gradient(135deg, #0a2e38 0%, #000 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4fd1c5',
          fontSize: '18px',
          fontWeight: 'bold',
          border: '1px solid #4fd1c5'
        }}
      >
        Map Component: {location}
      </div>
    );
  };
});

export default {
  title: 'GitHub Profile/Molecules/Profile/ProfileLocation',
  component: ProfileLocation,
  tags: ['autodocs'],
  decorators: [withAnimationContext],
  parameters: {
    docs: {
      description: {
        component: 'Profile location component that displays a user\'s location with a map visualization.',
      },
    },
    componentSubtitle: 'A molecule component for displaying user location',
  },
  argTypes: {
    location: { control: 'text' },
    animate: { control: 'boolean' },
  },
};

// Template for the component
const Template = (args) => (
  <div style={{ padding: '2rem', background: '#121212' }}>
    <ProfileLocation {...args} />
  </div>
);

/**
 * Default story shows the profile location with a location.
 */
export const Default = Template.bind({});
Default.args = {
  location: 'San Francisco, CA',
  animate: true,
};

/**
 * Different location example.
 */
export const DifferentLocation = Template.bind({});
DifferentLocation.args = {
  location: 'New York, NY',
  animate: true,
};

/**
 * Without animation example.
 */
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  location: 'San Francisco, CA',
  animate: false,
};

/**
 * No location example (component should not render).
 */
export const NoLocation = Template.bind({});
NoLocation.args = {
  location: null,
  animate: true,
};