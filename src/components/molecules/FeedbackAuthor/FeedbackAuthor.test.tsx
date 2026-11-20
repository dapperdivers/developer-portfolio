import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedbackAuthor, { authorInitials } from './FeedbackAuthor';

describe('authorInitials', () => {
  it('uses the first letter of the first and last word', () => {
    expect(authorInitials('Scott Latsa')).toBe('SL');
    expect(authorInitials('maya  van der okafor')).toBe('MO');
  });

  it('handles a single word and an empty name', () => {
    expect(authorInitials('Priya')).toBe('P');
    expect(authorInitials('   ')).toBe('?');
  });
});

describe('FeedbackAuthor', () => {
  it('draws an initials badge when there is no photo', () => {
    render(<FeedbackAuthor name="Scott Latsa" role="Director" animated={false} />);
    expect(screen.getByText('SL')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('shows the photo instead of the badge when one is given', () => {
    render(<FeedbackAuthor name="Scott Latsa" role="Director" avatar="/photo.png" animated={false} />);
    expect(screen.getByAltText('Scott Latsa')).toBeInTheDocument();
    expect(screen.queryByText('SL')).not.toBeInTheDocument();
  });
});
