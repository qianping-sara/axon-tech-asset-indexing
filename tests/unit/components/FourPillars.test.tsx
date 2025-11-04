import React from 'react';
import { render, screen } from '@testing-library/react';
import FourPillars from '@/components/home/FourPillars';

describe('FourPillars Component', () => {
  it('renders section title', () => {
    render(<FourPillars />);
    expect(screen.getByText('Four Pillars')).toBeInTheDocument();
  });

  it('renders section description', () => {
    render(<FourPillars />);
    expect(screen.getByText(/Our approach to managing/)).toBeInTheDocument();
  });

  it('renders all four pillar titles', () => {
    render(<FourPillars />);
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Integrate')).toBeInTheDocument();
    expect(screen.getByText('Govern')).toBeInTheDocument();
    expect(screen.getByText('Optimize')).toBeInTheDocument();
  });

  it('renders all four pillar descriptions', () => {
    render(<FourPillars />);
    expect(screen.getByText(/Find and explore/)).toBeInTheDocument();
    expect(screen.getByText(/Seamlessly integrate/)).toBeInTheDocument();
    expect(screen.getByText(/Maintain control and compliance/)).toBeInTheDocument();
    expect(screen.getByText(/Continuously improve/)).toBeInTheDocument();
  });

  it('renders all four pillar icons', () => {
    render(<FourPillars />);
    expect(screen.getByText('🔍')).toBeInTheDocument();
    expect(screen.getByText('🔗')).toBeInTheDocument();
    expect(screen.getByText('⚖️')).toBeInTheDocument();
    expect(screen.getByText('⚡')).toBeInTheDocument();
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
    expect(section).toHaveClass('bg-gray-50');
  });

  it('renders cards with hover effects', () => {
    const { container } = render(<FourPillars />);
    const cards = container.querySelectorAll('[class*="hover"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});

