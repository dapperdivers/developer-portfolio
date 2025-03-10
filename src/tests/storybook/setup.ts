import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { configure } from '@storybook/test';
import type { StorybookConfig } from '@storybook/react-vite';
import * as globalStorybookConfig from '../../../.storybook/preview';

// Initialize Storybook's configuration for testing
configure(globalStorybookConfig as StorybookConfig);

// Mock Storybook-specific features
vi.mock('@storybook/addon-actions', () => ({
  action: vi.fn((name) => vi.fn().mockName(name))
}));

// Add any additional Storybook-specific test setup here