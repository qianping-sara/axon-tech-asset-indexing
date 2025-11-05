import React from 'react';
import { render, screen } from '@testing-library/react';
import FourPillars from '@/components/home/FourPillars';

describe('FourPillars Component', () => {
  it('renders section title', () => {
    render(<FourPillars />);
    expect(screen.getByText('Built on Four Pillars')).toBeInTheDocument();
  });

  it('renders section description', () => {
    render(<FourPillars />);
    expect(screen.getByText(/Our vision for horizontal/)).toBeInTheDocument();
  });

  it('renders all four pillar titles', () => {
    render(<FourPillars />);
    expect(screen.getByText('Reliable')).toBeInTheDocument();
    expect(screen.getByText('Re-usable')).toBeInTheDocument();
    expect(screen.getByText('Scalable')).toBeInTheDocument();
    expect(screen.getByText('Trackable')).toBeInTheDocument();
  });

  it('renders all four pillar descriptions', () => {
    render(<FourPillars />);
    expect(screen.getByText(/Validated and trustworthy/)).toBeInTheDocument();
    expect(screen.getByText(/Build once, use multiple/)).toBeInTheDocument();
    expect(screen.getByText(/Support future automation/)).toBeInTheDocument();
    expect(screen.getByText(/Know which assets are used/)).toBeInTheDocument();
  });

  it('renders four pillar cards', () => {
    const { container } = render(<FourPillars />);
    const cards = container.querySelectorAll('[class*="border"]');
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it('has proper grid layout classes', () => {
    const { container } = render(<FourPillars />);
    const grid = container.querySelector('[class*="grid"]');
    expect(grid).toHaveClass('grid');
  });

  it('has proper styling for section', () => {
    const { container } = render(<FourPillars />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-white');
  });

  it('renders cards with hover effects', () => {
    const { container } = render(<FourPillars />);
    const cards = container.querySelectorAll('[class*="hover"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});

