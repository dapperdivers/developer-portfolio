import { render, screen } from '@testing-library/react';
import SiteLinks from './SiteLinks';

const links = [
  { id: 'docs', label: 'Docs', href: '/docs/' },
  { id: 'source', label: 'Source', href: 'https://github.com/x/y', external: true },
];

describe('SiteLinks', () => {
  it('renders each link in a named nav landmark', () => {
    render(<SiteLinks links={links} label="Site sections" />);
    expect(screen.getByRole('navigation', { name: 'Site sections' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs/');
  });

  it('opens external links in a new tab and says so', () => {
    render(<SiteLinks links={links} />);
    const source = screen.getByRole('link', { name: /Source/ });
    expect(source).toHaveAttribute('target', '_blank');
    expect(source).toHaveAttribute('rel', 'noopener noreferrer');
    expect(source).toHaveTextContent('opens in a new tab');
    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('target');
  });

  it('applies the variant class', () => {
    const { container } = render(<SiteLinks links={links} variant="footer" />);
    expect(container.firstChild).toHaveClass('site-links--footer');
  });

  it('renders nothing without links', () => {
    const { container } = render(<SiteLinks links={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
