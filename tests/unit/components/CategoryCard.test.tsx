import React from 'react';
import { render, screen } from '@testing-library/react';
import CategoryCard from '@/components/home/CategoryCard';

// Mock next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

describe('CategoryCard Component', () => {
  const mockCategory = {
    name: 'CODE_COMPONENTS',
    displayName: 'Code & Components',
    description: 'Scripts, libraries, frameworks, components, and reusable code modules',
    icon: '💻',
    assetTypes: ['Scripts', 'Frontend Components', 'Backend Libraries', 'Development Frameworks', 'Open Source Projects'],
    assetCount: 42,
  };

  it('renders category name', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText('Code & Components')).toBeInTheDocument();
  });

  it('renders category description', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText(/Scripts, libraries, frameworks/)).toBeInTheDocument();
  });

  it('renders category icon', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText('💻')).toBeInTheDocument();
  });

  it('renders asset count badge', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('displays first 3 asset types', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText('Scripts')).toBeInTheDocument();
    expect(screen.getByText('Frontend Components')).toBeInTheDocument();
    expect(screen.getByText('Backend Libraries')).toBeInTheDocument();
  });

  it('shows +more indicator when more than 3 asset types', () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText('+2 more')).toBeInTheDocument();
  });

  it('does not show +more when 3 or fewer asset types', () => {
    const categoryWith3Types = {
      ...mockCategory,
      assetTypes: ['Scripts', 'Frontend Components', 'Backend Libraries'],
    };
    render(<CategoryCard category={categoryWith3Types} />);
    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument();
  });

  it('renders as a link to category search', () => {
    const { container } = render(<CategoryCard category={mockCategory} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', expect.stringContaining('CODE_COMPONENTS'));
  });

  it('has proper styling classes', () => {
    const { container } = render(<CategoryCard category={mockCategory} />);
    const card = container.querySelector('div');
    expect(card).toHaveClass('bg-white', 'border', 'rounded-lg');
  });

  it('handles missing asset count gracefully', () => {
    const categoryWithoutCount = {
      ...mockCategory,
      assetCount: undefined,
    };
    render(<CategoryCard category={categoryWithoutCount} />);
    expect(screen.queryByText('42')).not.toBeInTheDocument();
  });
});

