import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

let shouldThrow = true;

const Buggy = () => {
  if (shouldThrow) throw new Error('boom');
  return <div>Recovered</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    shouldThrow = true;
    vi.spyOn(console, 'error').mockImplementation(() => {});
    window.matchMedia = window.matchMedia || ((query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    } as MediaQueryList));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows the ERR view with a Retry button when a child throws', () => {
    render(<ErrorBoundary><Buggy /></ErrorBoundary>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('ERR')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('renders the children again after Retry once the cause is fixed', async () => {
    render(<ErrorBoundary><Buggy /></ErrorBoundary>);
    shouldThrow = false;
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(await screen.findByText('Recovered')).toBeInTheDocument();
  });
});
