import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
  });

  it('renders search button', () => {
    render(<Header />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    render(<Header />);
    const menuButton = screen.getAllByRole('button')[0];
    
    // Menu should not be visible initially
    const mobileNav = screen.queryAllByText('Home');
    expect(mobileNav.length).toBe(1); // Only desktop nav
    
    // Click menu button
    fireEvent.click(menuButton);
    
    // Mobile menu should now be visible
    const mobileNavAfter = screen.queryAllByText('Home');
    expect(mobileNavAfter.length).toBeGreaterThan(1);
  });

  it('has sticky positioning', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky', 'top-0', 'z-50');
  });

  it('has proper styling classes', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-white', 'border-b', 'border-gray-200');
  });
});

