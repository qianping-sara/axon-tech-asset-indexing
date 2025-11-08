import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/layout/Header';

// Mock next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

describe('Header Component', () => {
  it('renders logo and app name', () => {
    render(<Header />);
    expect(screen.getByText('Axon')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
  });

  it('renders logo as clickable link to home', () => {
    render(<Header />);
    const logoLink = screen.getByText('Axon').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders discover link', () => {
    render(<Header />);
    const discoverLink = screen.getByText('Discover').closest('a');
    expect(discoverLink).toHaveAttribute('href', '/search');
  });

  it('has sticky positioning', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky', 'top-0', 'z-50');
  });

  it('has proper styling classes', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('backdrop-blur-md', 'border-b');
  });
});

