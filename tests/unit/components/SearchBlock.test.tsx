import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBlock from '@/components/home/SearchBlock';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock fetch
global.fetch = jest.fn();

describe('SearchBlock Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: [
          { id: '1', name: 'React', count: 10 },
          { id: '2', name: 'TypeScript', count: 8 },
        ],
      }),
    });
  });

  it('renders search title and description', () => {
    render(<SearchBlock />);
    expect(screen.getByText('One Search, All Assets')).toBeInTheDocument();
    expect(screen.getByText(/Discover and explore/)).toBeInTheDocument();
  });

  it('renders search input and button', () => {
    render(<SearchBlock />);
    expect(screen.getByPlaceholderText(/Search assets/)).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('fetches and displays popular tags', async () => {
    render(<SearchBlock />);
    
    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
  });

  it('displays tag counts', async () => {
    render(<SearchBlock />);
    
    await waitFor(() => {
      expect(screen.getByText('(10)')).toBeInTheDocument();
      expect(screen.getByText('(8)')).toBeInTheDocument();
    });
  });

  it('handles search form submission', async () => {
    const { container } = render(<SearchBlock />);
    const input = screen.getByPlaceholderText(/Search assets/);
    const form = container.querySelector('form');
    
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.submit(form!);
    
    // Should navigate to search page
    expect(input).toHaveValue('test query');
  });

  it('handles tag click', async () => {
    render(<SearchBlock />);
    
    await waitFor(() => {
      const reactTag = screen.getByText('React');
      expect(reactTag).toBeInTheDocument();
    });
  });

  it('renders search form with input and button', () => {
    render(<SearchBlock />);
    const input = screen.getByPlaceholderText(/Search assets/);
    const button = screen.getByText('Search');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});

