import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '@/tests/unit/setup';
import Greetings from './Greetings';

// Mock the portfolio data
vi.mock('@/portfolio', () => ({
  greetings: {
    title: 'Test Title',
    description: 'Test Description'
  }
}));

// Mock the hooks
vi.mock('@/hooks/useCallbackHandlers', () => ({
  default: () => ({
    handleDownload: vi.fn()
  })
}));

// Mock the components
vi.mock('@atoms/Button', () => ({
  default: ({ children, onClick, ...props }) => (
    <button onClick={onClick} data-testid="mock-button" {...props}>
      {children}
    </button>
  )
}));

vi.mock('@molecules/SocialLinks', () => ({
  default: () => <div data-testid="mock-social-links">Social Links</div>
}));

vi.mock('@atoms/ScrollDown', () => ({
  default: ({ onClick }) => (
    <button onClick={onClick} data-testid="mock-scroll-down">
      Scroll Down
    </button>
  )
}));

describe('Greetings Component', () => {
  const mockHandleDownload = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock the useCallbackHandlers hook
    vi.mocked(require('@/hooks/useCallbackHandlers').default).mockImplementation(() => ({
      handleDownload: mockHandleDownload
    }));
  });

  it('renders correctly with default props', () => {
    renderWithProviders(<Greetings />);
    
    expect(screen.getByTestId('greeting-heading')).toHaveTextContent('Test Title');
    expect(screen.getByTestId('title-text')).toHaveTextContent('Test Description');
    expect(screen.getByTestId('mock-social-links')).toBeInTheDocument();
    expect(screen.getByTestId('mock-scroll-down')).toBeInTheDocument();
  });

  it('handles resume download correctly', () => {
    renderWithProviders(<Greetings />);
    
    const downloadButton = screen.getByText('Download Resume');
    fireEvent.click(downloadButton);
    
    expect(mockHandleDownload).toHaveBeenCalledWith(
      '/files/Derek_Mackley_Resume_2025.pdf',
      'Derek_Mackley_Resume_2025.pdf'
    );
  });

  it('handles scroll down correctly', () => {
    // Mock the nextElementSibling
    const mockNextSection = document.createElement('div');
    const mockScrollIntoView = vi.fn();
    mockNextSection.scrollIntoView = mockScrollIntoView;
    
    const mockGetElementById = vi.spyOn(document, 'querySelector');
    mockGetElementById.mockReturnValue({
      nextElementSibling: mockNextSection
    });

    renderWithProviders(<Greetings />);
    
    const scrollDownButton = screen.getByTestId('mock-scroll-down');
    fireEvent.click(scrollDownButton);
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('applies animations when enabled', () => {
    const { container } = renderWithProviders(<Greetings />, {
      animationEnabled: true
    });
    
    const mainContainer = container.querySelector('#greetings-section');
    expect(mainContainer).toBeInTheDocument();
  });

  it('does not apply animations when disabled', () => {
    const { container } = renderWithProviders(<Greetings />, {
      animationEnabled: false
    });
    
    const mainContainer = container.querySelector('#greetings-section');
    expect(mainContainer).toBeInTheDocument();
  });
});