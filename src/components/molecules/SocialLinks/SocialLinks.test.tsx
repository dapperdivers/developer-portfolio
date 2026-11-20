import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SocialLinks from '@molecules/SocialLinks';
import { downloadFile } from '@utils/download';
import type { ProfileLinks } from '@/types/portfolio';

vi.mock('@utils/download', () => ({ downloadFile: vi.fn() }));

vi.mock('react-icons/fa', () => ({
  FaGithub: () => <svg data-testid="github-icon" />,
  FaLinkedin: () => <svg data-testid="linkedin-icon" />,
  FaAddressCard: () => <svg data-testid="address-card-icon" />
}));

const links: ProfileLinks = {
  github: 'https://github.com/example',
  linkedin: 'https://www.linkedin.com/in/example/',
  contactCard: '/contact/Example_Person.vcf'
};

// Rendered with no provider on purpose: the block takes everything as props.
describe('SocialLinks Component', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renders a link for each URL it is given', () => {
    render(<SocialLinks links={links} />);

    expect(screen.getByLabelText('GitHub Profile')).toHaveAttribute('href', links.github);
    expect(screen.getByLabelText('LinkedIn Profile')).toHaveAttribute('href', links.linkedin);
    expect(screen.getByLabelText('Download Contact Card')).toHaveAttribute('href', links.contactCard);
  });

  it('renders nothing but the container when given no links', () => {
    render(<SocialLinks />);

    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('hides the icons whose links are missing', () => {
    render(<SocialLinks links={{ github: links.github }} />);

    expect(screen.getByLabelText('GitHub Profile')).toBeInTheDocument();
    expect(screen.queryByLabelText('LinkedIn Profile')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Download Contact Card')).not.toBeInTheDocument();
  });

  it('opens profile links in a new tab without leaking the opener', () => {
    render(<SocialLinks links={links} />);

    for (const label of ['GitHub Profile', 'LinkedIn Profile']) {
      const link = screen.getByLabelText(label);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('downloads the contact card under its own file name', () => {
    render(<SocialLinks links={links} />);

    fireEvent.click(screen.getByLabelText('Download Contact Card'));

    expect(downloadFile).toHaveBeenCalledWith('/contact/Example_Person.vcf', 'Example_Person.vcf');
  });

  it('applies a custom class name', () => {
    const { container } = render(<SocialLinks links={links} className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
