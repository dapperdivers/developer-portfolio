import React from 'react';

// Simple Badge component
const SimpleBadge = ({ text = 'New', color = 'red' }) => (
  <span style={{ 
    backgroundColor: color, 
    color: 'white', 
    padding: '4px 8px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block'
  }}>
    {text}
  </span>
);

export default {
  title: 'Example/SimpleBadge',
  component: SimpleBadge,
};

export const Default = () => <SimpleBadge />;
export const Green = () => <SimpleBadge text="Success" color="green" />;
export const Blue = () => <SimpleBadge text="Info" color="blue" />;