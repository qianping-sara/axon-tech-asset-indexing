import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UtilityCategoryFilter from '@/components/utilities/UtilityCategoryFilter';
import { UtilityCategory } from '@/lib/types/utility';

const mockCategories: UtilityCategory[] = [
  { id: 'decision-support', name: 'Decision Support' },
  { id: 'process-automation', name: 'Process Automation' },
];

describe('UtilityCategoryFilter Component', () => {
  it('renders all category buttons', () => {
    const mockOnChange = jest.fn();
    render(
      <UtilityCategoryFilter
        categories={mockCategories}
        selectedCategory={null}
        onCategoryChange={mockOnChange}
      />
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Decision Support')).toBeInTheDocument();
    expect(screen.getByText('Process Automation')).toBeInTheDocument();
  });

  it('highlights selected category', () => {
    const mockOnChange = jest.fn();
    render(
      <UtilityCategoryFilter
        categories={mockCategories}
        selectedCategory="decision-support"
        onCategoryChange={mockOnChange}
      />
    );

    const selectedButton = screen.getByText('Decision Support');
    expect(selectedButton).toHaveClass('bg-green-700', 'text-white');
  });

  it('highlights All button when no category selected', () => {
    const mockOnChange = jest.fn();
    render(
      <UtilityCategoryFilter
        categories={mockCategories}
        selectedCategory={null}
        onCategoryChange={mockOnChange}
      />
    );

    const allButton = screen.getByText('All');
    expect(allButton).toHaveClass('bg-green-700', 'text-white');
  });

  it('calls onCategoryChange when category button clicked', () => {
    const mockOnChange = jest.fn();
    render(
      <UtilityCategoryFilter
        categories={mockCategories}
        selectedCategory={null}
        onCategoryChange={mockOnChange}
      />
    );

    const decisionSupportButton = screen.getByText('Decision Support');
    fireEvent.click(decisionSupportButton);

    expect(mockOnChange).toHaveBeenCalledWith('decision-support');
  });

  it('calls onCategoryChange with null when All button clicked', () => {
    const mockOnChange = jest.fn();
    render(
      <UtilityCategoryFilter
        categories={mockCategories}
        selectedCategory="decision-support"
        onCategoryChange={mockOnChange}
      />
    );

    const allButton = screen.getByText('All');
    fireEvent.click(allButton);

    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  it('renders unselected buttons with gray background', () => {
    const mockOnChange = jest.fn();
    render(
      <UtilityCategoryFilter
        categories={mockCategories}
        selectedCategory="decision-support"
        onCategoryChange={mockOnChange}
      />
    );

    const unselectedButton = screen.getByText('Process Automation');
    expect(unselectedButton).toHaveClass('bg-gray-100', 'text-gray-700');
  });
});

