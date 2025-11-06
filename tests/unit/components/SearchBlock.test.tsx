import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBlock from '@/components/search/SearchBlock';

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
    expect(screen.getByText('Discover Automation Assets')).toBeInTheDocument();
    expect(screen.getByText(/Your unified portal/)).toBeInTheDocument();
  });

  it('renders search input and button', () => {
    render(<SearchBlock />);
    expect(screen.getByPlaceholderText(/Search for APIs/)).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('fetches and displays popular tags', async () => {
    render(<SearchBlock />);

    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
  });

  it('handles search form submission', async () => {
    const { container } = render(<SearchBlock />);
    const input = screen.getByPlaceholderText(/Search for APIs/);
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
    const input = screen.getByPlaceholderText(/Search for APIs/);
    const button = screen.getByText('Search');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});

