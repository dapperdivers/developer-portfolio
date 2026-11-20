// Mock Navigation component
import type { ComponentProps, ComponentType } from 'react';
import type RealNavigation from '@layout/Navigation';

const Navigation: ComponentType<ComponentProps<typeof RealNavigation>> = () => (
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