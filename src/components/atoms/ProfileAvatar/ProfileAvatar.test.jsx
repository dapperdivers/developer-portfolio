import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileAvatar from './ProfileAvatar';

describe('ProfileAvatar', () => {
  test('renders the image when src is provided', () => {
    render(<ProfileAvatar src="https://example.com/a.png" alt="Me avatar" animate={false} />);
    expect(screen.getByAltText('Me avatar')).toHaveAttribute('src', 'https://example.com/a.png');
  });

  test('shows the placeholder instead of an image when src is missing', () => {
    render(<ProfileAvatar alt="Me avatar" animate={false} />);
    expect(screen.queryByAltText('Me avatar')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Me avatar' })).toBeInTheDocument();
  });

  test('shows the placeholder when the image fails to load', () => {
    render(<ProfileAvatar src="https://example.com/broken.png" alt="Me avatar" animate={false} />);
    fireEvent.error(screen.getByAltText('Me avatar'));
    expect(screen.queryByAltText('Me avatar')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Me avatar' })).toBeInTheDocument();
  });
});
