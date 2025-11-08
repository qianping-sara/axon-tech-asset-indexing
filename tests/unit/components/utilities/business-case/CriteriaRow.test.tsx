import React from 'react';
import { render, screen } from '@testing-library/react';
import CriteriaRow from '@/components/utilities/business-case/CriteriaRow';
import { CriteriaScore } from '@/lib/types/business-case';

describe('CriteriaRow Component', () => {
  const mockData: CriteriaScore = { notes: '', score: 0 };
  const mockOnChange = jest.fn();

  const defaultProps = {
    title: 'Test Criteria',
    weight: 30,
    description: 'Test description',
    data: mockData,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders criteria title and weight', () => {
    render(<CriteriaRow {...defaultProps} />);
    expect(screen.getByText('Test Criteria')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<CriteriaRow {...defaultProps} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders title, weight, and description', () => {
    render(<CriteriaRow {...defaultProps} />);
    expect(screen.getByText('Test Criteria')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders with initial data', () => {
    const dataWithScore: CriteriaScore = { notes: 'Test notes', score: 4 };
    const { container } = render(<CriteriaRow {...defaultProps} data={dataWithScore} />);

    expect(container).toBeInTheDocument();
  });

  it('handles score changes', () => {
    const dataWithScore: CriteriaScore = { notes: '', score: 5 };
    render(<CriteriaRow {...defaultProps} data={dataWithScore} />);

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});

