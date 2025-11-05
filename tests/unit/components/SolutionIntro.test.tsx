import React from 'react';
import { render, screen } from '@testing-library/react';
import SolutionIntro from '@/components/home/SolutionIntro';

describe('SolutionIntro Component', () => {
  it('renders the solution badge', () => {
    render(<SolutionIntro />);
    expect(screen.getByText('The Solution')).toBeInTheDocument();
  });

  it('renders main title', () => {
    render(<SolutionIntro />);
    expect(screen.getByText('Your Unified Discovery Portal')).toBeInTheDocument();
  });

  it('renders problem statement', () => {
    render(<SolutionIntro />);
    expect(screen.getByText(/When automation assets are scattered/)).toBeInTheDocument();
  });

  it('renders solution statement with Golden Index', () => {
    render(<SolutionIntro />);
    expect(screen.getByText(/Golden Index/)).toBeInTheDocument();
    expect(screen.getByText(/Axon is the/)).toBeInTheDocument();
  });

  it('renders all three key capabilities', () => {
    render(<SolutionIntro />);
    expect(screen.getByText(/Contextual search across all asset types/)).toBeInTheDocument();
    expect(screen.getByText(/Trusted metadata from source systems/)).toBeInTheDocument();
    expect(screen.getByText(/Accelerate delivery, reduce costs/)).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<SolutionIntro />);
    const button = screen.getByText('Start Discovering Assets');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/search');
  });

  it('has proper section styling', () => {
    const { container } = render(<SolutionIntro />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-white', 'py-20');
  });
});

