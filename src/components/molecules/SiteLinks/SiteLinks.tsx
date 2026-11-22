import type { SiteLink } from '@/types/portfolio';
import './SiteLinks.css';

export interface SiteLinksProps {
  /** The links to show, in order */
  links: SiteLink[];
  /** `nav` is the compact header row; `footer` matches the footer's text links */
  variant?: 'nav' | 'footer';
  /** Accessible name for the link list */
  label?: string;
  /** Id of the link for the page being viewed; it is marked aria-current="page" */
  currentId?: string;
  className?: string;
}

/**
 * Text links to the parts of the site outside the single page:
 * docs, the Storybook component library, the blog and the source.
 * Props only.
 */
const SiteLinks = ({ links, variant = 'nav', label = 'More from this site', currentId, className = '' }: SiteLinksProps) => {
  if (links.length === 0) return null;
  return (
    <nav className={`site-links site-links--${variant} ${className}`.trim()} aria-label={label}>
      <ul className="site-links__list">
        {links.map((link) => (
          <li key={link.id} className="site-links__item">
            <a
              className="site-links__link"
              href={link.href}
              data-testid={`site-link-${link.id}`}
              aria-current={link.id === currentId ? 'page' : undefined}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
              {link.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SiteLinks;
