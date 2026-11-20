import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from './Footer';
import { vi } from 'vitest';
import type { ComponentProps, ReactNode } from 'react';

// Create mock functions for hooks
const mockUseFooter = vi.fn();
const mockUseCallbackHandlers = vi.fn();

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    footer: ({ children, ...props }: ComponentProps<'footer'>) => <footer {...props}>{children}</footer>,
    div: ({ children, ...props }: ComponentProps<'div'>) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: ComponentProps<'a'>) => <a {...props}>{children}</a>,
    span: ({ children, ...props }: ComponentProps<'span'>) => <span {...props}>{children}</span>
  },
  AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>
}));

// Mock the useFooter hook
vi.mock('@hooks/useFooter', () => ({
  default: () => mockUseFooter()
}));

// Mock the useCallbackHandlers hook
vi.mock('@/hooks/useCallbackHandlers', () => ({
  default: () => mockUseCallbackHandlers()
}));

// Mock the cluster status hook
const mockUseClusterStatus = vi.fn();
vi.mock('@hooks/useClusterStatus', () => ({
  default: () => mockUseClusterStatus()
}));

// Mock AnimationContext
vi.mock('@context/AnimationContext', () => ({
  useAnimation: () => ({
    animationEnabled: true
  })
}));

describe('Footer Component', () => {
  const mockFooterData = {
    currentYear: 2025,
    scrollToTop: vi.fn(),
    greetings: {
      name: 'Derek Mackley',
      resumeLink: 'https://example.com/resume.pdf'
    }
  };
  
  const mockHandlersData = {
    handleDownload: vi.fn()
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    mockUseFooter.mockReturnValue(mockFooterData);
    mockUseCallbackHandlers.mockReturnValue(mockHandlersData);
    mockUseClusterStatus.mockReturnValue({ status: 'loading', data: null });
  });

  it('renders correctly with all required data', () => {
    render(<Footer />);
    
    // Check that the footer element is rendered
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Check for copyright text with year and name
    const footerText = screen.getByText(/© 2025/);
    expect(footerText).toBeInTheDocument();
    
    // The social icon row is gone from the footer
    expect(screen.queryByTestId('social-links')).not.toBeInTheDocument();
    
    // Check for navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Contact Card')).toBeInTheDocument();
    expect(screen.queryByText(/Made with/)).not.toBeInTheDocument();
  });


  it('renders navigation links with correct hrefs', () => {
    render(<Footer />);
    
    // Check that all navigation links have correct hrefs
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '#main-content');
    expect(screen.getByText('Experience').closest('a')).toHaveAttribute('href', '#experience');
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '#projects');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '#contact');
    expect(screen.getByText('Resume').closest('a')).toHaveAttribute('href', 'https://example.com/resume.pdf');
    expect(screen.getByText('Contact Card').closest('a')).toHaveAttribute('href', '/contact/Derek_Mackley.vcf');
  });
  
  it('calls handleDownload when Contact Card link is clicked', () => {
    render(<Footer />);
    
    // Find and click the Contact Card link
    const contactCardLink = screen.getByText('Contact Card');
    fireEvent.click(contactCardLink);
    
    // Check that the handleDownload function was called with correct parameters
    expect(mockHandlersData.handleDownload).toHaveBeenCalledTimes(1);
    expect(mockHandlersData.handleDownload).toHaveBeenCalledWith('/contact/Derek_Mackley.vcf', 'Derek_Mackley.vcf');
  });

  describe('cluster line', () => {
    const okData = {
      updatedAt: '2026-11-20T14:32:00.000Z',
      badges: {
        cluster_status: { title: 'Cluster', value: 'up', color: 'green' },
        cluster_node_count: { title: 'Nodes', value: '11', color: 'green' },
        cluster_pod_count: { title: 'Pods', value: '266', color: 'green' }
      }
    };

    it('shows live numbers and links to the cluster repo', () => {
      mockUseClusterStatus.mockReturnValue({ status: 'ok', data: okData });
      render(<Footer />);
      const line = screen.getByTestId('footer-cluster-line');
      expect(line).toHaveTextContent('Served from a Talos cluster in my garage · 11 nodes · 266 pods · all systems up');
      expect(line).toHaveAttribute('href', 'https://github.com/dapperdivers/dapper-cluster');
    });

    it('says degraded when the cluster is not up', () => {
      mockUseClusterStatus.mockReturnValue({
        status: 'ok',
        data: { ...okData, badges: { ...okData.badges, cluster_status: { title: 'Cluster', value: 'degraded', color: 'yellow' } } }
      });
      render(<Footer />);
      expect(screen.getByTestId('footer-cluster-line')).toHaveTextContent(/11 nodes · 266 pods · degraded$/);
    });

    it.each(['loading', 'error'] as const)('shows only the fixed text while %s', (status) => {
      mockUseClusterStatus.mockReturnValue({ status, data: null });
      render(<Footer />);
      const line = screen.getByTestId('footer-cluster-line');
      expect(line).toHaveTextContent(/^Served from a Talos cluster in my garage$/);
      expect(line.textContent).not.toMatch(/\d/);
    });
  });
});
