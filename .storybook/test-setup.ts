import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Storybook-specific features
vi.mock('@storybook/addon-actions', () => ({
  action: vi.fn((name) => vi.fn().mockName(name))
}));

// Add any additional Storybook-specific test setup here