import React from 'react';
import { render, screen } from '@testing-library/react';
import Feedbacks from '@organisms/Feedbacks';
import { vi } from 'vitest';

// Mock functions
const mockUseFeedback = vi.fn();

// Mock the Section component
vi.mock('@layout/Section', () => ({
  default: (props) => {
    const { children, title, id, ...rest } = props;
    return (
      <div data-testid="feedbacks-section" id={id} {...rest}>
        <h2>{title}</h2>
        <div data-testid="section-content">{children}</div>
      </div>
    );
  }
}));

// Mock the FeedbackCard component
vi.mock('@molecules/FeedbackCard', () => ({
  default: ({ data, index }) => (
    <div data-testid={`feedback-card-${index}`}>
      <h3>{data.name}</h3>
      <p>{data.feedback}</p>
      <span>{data.designation || 'Client'}</span>
    </div>
  )
}));

// Mock useFeedback hook
vi.mock('@hooks/useFeedback', () => ({
  default: () => mockUseFeedback()
}));

describe('Feedbacks Container Component', () => {
  const mockFeedbacksData = [
    {
      name: "John Doe",
      feedback: "Working with this developer was fantastic.",
      designation: "Project Manager"
    },
    {
      name: "Jane Smith",
      feedback: "Delivered on time and with high quality.",
      designation: "CTO"
    }
  ];

  beforeEach(() => {
    // Reset mock before each test
    vi.clearAllMocks();
  });

  it('renders correctly with feedbacks data', () => {
    // Mock the hook to return feedbacks data
    mockUseFeedback.mockReturnValue(mockFeedbacksData);
    
    render(<Feedbacks />);
    
    // Check that the section renders
    expect(screen.getByTestId('feedbacks-section')).toBeInTheDocument();
    
    // Check that the section title is correct
    expect(screen.getByText('Personal Feedback')).toBeInTheDocument();
    
    // Check that both feedback cards are rendered
    expect(screen.getByTestId('feedback-card-0')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-card-1')).toBeInTheDocument();
    
    // Check that card info is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders nothing when no feedbacks are available', () => {
    // Mock the hook to return empty array
    mockUseFeedback.mockReturnValue([]);
    
    const { container } = render(<Feedbacks />);
    
    // Check that nothing is rendered
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when feedbacks is null', () => {
    // Mock the hook to return null
    mockUseFeedback.mockReturnValue(null);
    
    const { container } = render(<Feedbacks />);
    
    // Check that nothing is rendered
    expect(container).toBeEmptyDOMElement();
  });
});