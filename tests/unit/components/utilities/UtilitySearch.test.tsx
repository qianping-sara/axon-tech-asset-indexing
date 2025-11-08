import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UtilitySearch from '@/components/utilities/UtilitySearch';

describe('UtilitySearch Component', () => {
  it('renders search input', () => {
    const mockOnChange = jest.fn();
    render(<UtilitySearch value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText(/Search utilities/);
    expect(input).toBeInTheDocument();
  });

  it('displays current search value', () => {
    const mockOnChange = jest.fn();
    render(<UtilitySearch value="test query" onChange={mockOnChange} />);

    const input = screen.getByDisplayValue('test query') as HTMLInputElement;
    expect(input.value).toBe('test query');
  });

  it('calls onChange when input value changes', () => {
    const mockOnChange = jest.fn();
    render(<UtilitySearch value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText(/Search utilities/);
    fireEvent.change(input, { target: { value: 'new search' } });

    expect(mockOnChange).toHaveBeenCalledWith('new search');
  });

  it('shows clear button when value is not empty', () => {
    const mockOnChange = jest.fn();
    render(<UtilitySearch value="test" onChange={mockOnChange} />);

    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
  });

  it('does not show clear button when value is empty', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<UtilitySearch value="" onChange={mockOnChange} />);

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  it('clears search when clear button clicked', () => {
    const mockOnChange = jest.fn();
    render(<UtilitySearch value="test" onChange={mockOnChange} />);

    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('uses custom placeholder', () => {
    const mockOnChange = jest.fn();
    const customPlaceholder = 'Custom search placeholder';
    render(
      <UtilitySearch
        value=""
        onChange={mockOnChange}
        placeholder={customPlaceholder}
      />
    );

    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
  });

  it('renders search icon', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<UtilitySearch value="" onChange={mockOnChange} />);

    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });
});

