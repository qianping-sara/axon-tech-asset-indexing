import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AssetTypeFilter from '@/components/search/AssetTypeFilter';

describe('AssetTypeFilter Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows message when no category selected', () => {
    render(
      <AssetTypeFilter
        selectedCategory={undefined}
        selectedAssetTypes={[]}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByText(/Select a category/)).toBeInTheDocument();
  });

  it('renders asset type checkboxes when category selected', () => {
    render(
      <AssetTypeFilter
        selectedCategory="CODE_COMPONENTS"
        selectedAssetTypes={[]}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByText('Scripts')).toBeInTheDocument();
    expect(screen.getByText('Frontend Components')).toBeInTheDocument();
  });

  it('displays correct asset types for selected category', () => {
    render(
      <AssetTypeFilter
        selectedCategory="CODE_COMPONENTS"
        selectedAssetTypes={[]}
        onChange={mockOnChange}
      />
    );
    
    // CODE_COMPONENTS has 5 asset types
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(5);
  });

  it('checks selected asset types', () => {
    render(
      <AssetTypeFilter
        selectedCategory="CODE_COMPONENTS"
        selectedAssetTypes={['Scripts', 'Frontend Components']}
        onChange={mockOnChange}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect((checkboxes[0] as HTMLInputElement).checked).toBe(true);
    expect((checkboxes[1] as HTMLInputElement).checked).toBe(true);
  });

  it('calls onChange when checkbox is toggled', () => {
    render(
      <AssetTypeFilter
        selectedCategory="CODE_COMPONENTS"
        selectedAssetTypes={[]}
        onChange={mockOnChange}
      />
    );
    
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('adds asset type when unchecked checkbox is clicked', () => {
    render(
      <AssetTypeFilter
        selectedCategory="CODE_COMPONENTS"
        selectedAssetTypes={[]}
        onChange={mockOnChange}
      />
    );
    
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalledWith(['Scripts']);
  });

  it('removes asset type when checked checkbox is clicked', () => {
    render(
      <AssetTypeFilter
        selectedCategory="CODE_COMPONENTS"
        selectedAssetTypes={['Scripts']}
        onChange={mockOnChange}
      />
    );
    
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it('renders clear button when asset types selected', () => {
    render(
      <AssetTypeFilter
        selectedCategory="CODE_COMPONENTS"
        selectedAssetTypes={['Scripts']}
        onChange={mockOnChange}
      />
    );
    
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('clears all selections when clear button clicked', () => {
    render(
      <AssetTypeFilter
        selectedCategory="CODE_COMPONENTS"
        selectedAssetTypes={['Scripts', 'Frontend Components']}
        onChange={mockOnChange}
      />
    );
    
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);
    
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it('does not show clear button when no selections', () => {
    render(
      <AssetTypeFilter
        selectedCategory="CODE_COMPONENTS"
        selectedAssetTypes={[]}
        onChange={mockOnChange}
      />
    );
    
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });

  it('has proper styling', () => {
    const { container } = render(
      <AssetTypeFilter
        selectedCategory="CODE_COMPONENTS"
        selectedAssetTypes={[]}
        onChange={mockOnChange}
      />
    );
    
    const filterDiv = container.querySelector('div');
    expect(filterDiv).toHaveClass('bg-white', 'border', 'rounded-lg');
  });
});

