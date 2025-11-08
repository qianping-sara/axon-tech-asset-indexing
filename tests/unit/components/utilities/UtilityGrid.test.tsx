import React from 'react';
import { render, screen } from '@testing-library/react';
import UtilityGrid from '@/components/utilities/UtilityGrid';
import { Utility } from '@/lib/types/utility';

// Mock next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

const mockUtilities: Utility[] = [
  {
    id: 'tool-1',
    name: 'Business Case Tool',
    description: 'Business case analysis',
    category: 'decision-support',
    icon: 'briefcase',
    url: '/utilities/1',
    version: '1.0.0',
    status: 'PUBLISHED',
    owner: 'Team A',
    tags: ['decision'],
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
  },
  {
    id: 'tool-2',
    name: 'ROI Calculator',
    description: 'Calculate ROI',
    category: 'decision-support',
    icon: 'bar-chart-3',
    url: '/utilities/2',
    version: '1.0.0',
    status: 'PUBLISHED',
    owner: 'Team B',
    tags: ['roi'],
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
  },
];

describe('UtilityGrid Component', () => {
  it('renders utilities in grid', () => {
    render(<UtilityGrid utilities={mockUtilities} />);
    expect(screen.getByText('Business Case Tool')).toBeInTheDocument();
    expect(screen.getByText('ROI Calculator')).toBeInTheDocument();
  });

  it('groups utilities by category', () => {
    render(<UtilityGrid utilities={mockUtilities} />);
    expect(screen.getByText(/Decision Support Tools/i)).toBeInTheDocument();
  });

  it('shows loading state', () => {
    const { container } = render(<UtilityGrid utilities={[]} isLoading={true} />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('shows empty state when no utilities', () => {
    render(<UtilityGrid utilities={[]} isLoading={false} />);
    expect(screen.getByText('No utilities found')).toBeInTheDocument();
  });

  it('renders correct number of utility cards', () => {
    render(<UtilityGrid utilities={mockUtilities} />);
    const cards = screen.getAllByText(/View Details/);
    expect(cards).toHaveLength(mockUtilities.length);
  });

  it('uses responsive grid layout', () => {
    const { container } = render(<UtilityGrid utilities={mockUtilities} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });
});

