import React from 'react';
import { render, screen } from '@testing-library/react';
import SolutionWithPillars from '@/components/home/SolutionWithPillars';

describe('SolutionWithPillars Component', () => {
  it('renders the solution badge', () => {
    render(<SolutionWithPillars />);
    expect(screen.getByText('The Solution')).toBeInTheDocument();
  });

  it('renders main title', () => {
    render(<SolutionWithPillars />);
    expect(screen.getByText('Your Unified Discovery Portal')).toBeInTheDocument();
  });

  it('renders problem statement', () => {
    render(<SolutionWithPillars />);
    expect(screen.getByText(/When automation assets are scattered/)).toBeInTheDocument();
  });

  it('renders solution statement with Golden Index', () => {
    render(<SolutionWithPillars />);
    expect(screen.getByText(/Golden Index/)).toBeInTheDocument();
  });

  it('renders all three key capabilities', () => {
    render(<SolutionWithPillars />);
    expect(screen.getByText(/Contextual search across all asset types/)).toBeInTheDocument();
    expect(screen.getByText(/Trusted metadata from source systems/)).toBeInTheDocument();
    expect(screen.getByText(/Accelerate delivery, reduce costs/)).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<SolutionWithPillars />);
    const button = screen.getByText('Start Discovering Assets');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/discover');
  });

  it('renders all four pillars', () => {
    render(<SolutionWithPillars />);
    expect(screen.getByText('Reliable')).toBeInTheDocument();
    expect(screen.getByText('Re-usable')).toBeInTheDocument();
    expect(screen.getByText('Scalable')).toBeInTheDocument();
    expect(screen.getByText('Trackable')).toBeInTheDocument();
  });

  it('renders pillar descriptions', () => {
    render(<SolutionWithPillars />);
    expect(screen.getByText(/Validated and trustworthy assets/)).toBeInTheDocument();
    expect(screen.getByText(/Build once, use multiple times/)).toBeInTheDocument();
    expect(screen.getByText(/Support future automation/)).toBeInTheDocument();
    expect(screen.getByText(/Know which assets are used/)).toBeInTheDocument();
  });

  it('has gray background', () => {
    const { container } = render(<SolutionWithPillars />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-gray-50');
  });

  it('has two-column layout on large screens', () => {
    const { container } = render(<SolutionWithPillars />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('lg:grid-cols-2');
  });
});

