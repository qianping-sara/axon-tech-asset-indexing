import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SolutionIntro from '@/components/home/SolutionIntro';

// Mock next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

// Mock fetch
global.fetch = jest.fn();

describe('SolutionIntro Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders section title', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: true, data: [] }),
    });
    
    render(<SolutionIntro />);
    expect(screen.getByText('Asset Categories')).toBeInTheDocument();
  });

  it('renders section description', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: true, data: [] }),
    });
    
    render(<SolutionIntro />);
    expect(screen.getByText(/comprehensive collection/)).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      new Promise(() => {}) // Never resolves
    );
    
    render(<SolutionIntro />);
    expect(screen.getByText('Loading categories...')).toBeInTheDocument();
  });

  it('fetches categories from API', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [
          { name: 'CODE_COMPONENTS', assetCount: 10 },
          { name: 'SERVICES_APIS', assetCount: 15 },
        ],
      }),
    });
    
    render(<SolutionIntro />);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/categories')
      );
    });
  });

  it('renders category cards', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: true, data: [] }),
    });
    
    render(<SolutionIntro />);
    
    await waitFor(() => {
      // Should render at least one category card
      const cards = screen.queryAllByRole('link');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  it('handles API error gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    
    render(<SolutionIntro />);
    
    await waitFor(() => {
      // Should still render categories from constants
      expect(screen.queryByText('Loading categories...')).not.toBeInTheDocument();
    });
  });

  it('merges API data with constants', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [
          { name: 'CODE_COMPONENTS', assetCount: 25 },
        ],
      }),
    });
    
    render(<SolutionIntro />);
    
    await waitFor(() => {
      expect(screen.getByText('25')).toBeInTheDocument();
    });
  });

  it('displays 6 categories in grid', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: true, data: [] }),
    });
    
    render(<SolutionIntro />);
    
    await waitFor(() => {
      const links = screen.queryAllByRole('link');
      // Should have at least 6 category links
      expect(links.length).toBeGreaterThanOrEqual(6);
    });
  });
});

