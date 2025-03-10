import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { setProjectAnnotations } from '@storybook/testing-react';
import * as globalStorybookConfig from './preview';

// Initialize Storybook's configuration for testing
setProjectAnnotations(globalStorybookConfig);

// Mock Storybook-specific features
vi.mock('@storybook/addon-actions', () => ({
  action: vi.fn((name) => vi.fn().mockName(name))
}));

// Add any additional Storybook-specific test setup here