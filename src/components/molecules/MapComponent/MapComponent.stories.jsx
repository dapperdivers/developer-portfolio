import React from 'react';
import MapComponent from './MapComponent';

export default {
  title: 'Molecules/MapComponent',
  component: MapComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An interactive map component that displays locations with animations and custom styling using Leaflet.js.',
      },
    },
  },
  argTypes: {
    location: {
      control: 'text',
      description: 'Location name to geocode and display on the map',
    },
  },
};

/**
 * Default story showing the map with a specific location
 */
export const Default = {
  args: {
    location: "Warrior, Al",
  },
};

/**
 * Story showing the map with a different location
 */
export const NewYorkLocation = {
  args: {
    location: 'New York, NY',
  },
};

/**
 * Story showing the map with a location in Europe
 */
export const LondonLocation = {
  args: {
    location: 'London, UK',
  },
};

/**
 * Story showing the map with a location in Asia
 */
export const TokyoLocation = {
  args: {
    location: 'Tokyo, Japan',
  },
};

/**
 * Story showing the map in mobile viewport
 */
export const MobileView = {
  args: {
    location: 'San Francisco, CA',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Story showing the map in tablet viewport
 */
export const TabletView = {
  args: {
    location: 'San Francisco, CA',
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Story showing error handling with an invalid location
 */
export const InvalidLocation = {
  args: {
    location: 'NonexistentPlace, XY',
  },
};

/**
 * Story showing the map with dark mode enabled
 */
export const DarkMode = {
  args: {
    location: 'San Francisco, CA',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}; 