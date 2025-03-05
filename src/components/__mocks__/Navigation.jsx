// Mock Navigation component
import React from 'react';

const Navigation = () => (
  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <div>Derek Mackley</div>
      <button aria-label="Open navigation menu" aria-controls="navigation-collapse" aria-expanded="false">
        Menu
      </button>
    </nav>
  </header>
);

export default Navigation;