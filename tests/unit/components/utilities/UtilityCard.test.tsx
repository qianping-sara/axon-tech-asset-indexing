import React from 'react';
import { render, screen } from '@testing-library/react';
import UtilityCard from '@/components/utilities/UtilityCard';
import { Utility } from '@/lib/types/utility';

// Mock next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

const mockUtility: Utility = {
  id: 'tool-test-001',
  name: 'Test Utility',
  description: 'This is a test utility for testing purposes',
  category: 'decision-support',
  icon: 'briefcase',
  url: '/utilities/test',
  version: '1.0.0',
  status: 'PUBLISHED',
  owner: 'Test Team',
  tags: ['test', 'utility'],
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),
};

describe('UtilityCard Component', () => {
  it('renders utility name', () => {
    render(<UtilityCard utility={mockUtility} />);
    expect(screen.getByText('Test Utility')).toBeInTheDocument();
  });

  it('renders utility description', () => {
    render(<UtilityCard utility={mockUtility} />);
    expect(screen.getByText(/This is a test utility/)).toBeInTheDocument();
  });

  it('renders category badge', () => {
    render(<UtilityCard utility={mockUtility} />);
    expect(screen.getByText('decision-support')).toBeInTheDocument();
  });

  it('renders view details button', () => {
    render(<UtilityCard utility={mockUtility} />);
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });

  it('links to utility detail page', () => {
    render(<UtilityCard utility={mockUtility} />);
    const link = screen.getByText('Test Utility').closest('a');
    expect(link).toHaveAttribute('href', '/utilities/tool-test-001');
  });

  it('renders as a link element', () => {
    const { container } = render(<UtilityCard utility={mockUtility} />);
    const card = container.querySelector('a');
    expect(card).toBeInTheDocument();
  });

  it('truncates long descriptions', () => {
    const longDescriptionUtility = {
      ...mockUtility,
      description: 'A'.repeat(500),
    };
    const { container } = render(<UtilityCard utility={longDescriptionUtility} />);
    const description = container.querySelector('p');
    expect(description).toHaveClass('line-clamp-3');
  });
});

