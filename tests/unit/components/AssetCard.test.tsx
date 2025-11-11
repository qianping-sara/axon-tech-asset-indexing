import React from 'react';
import { render, screen } from '@testing-library/react';
import AssetCard from '@/components/assets/AssetCard';

// Mock next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

describe('AssetCard Component', () => {
  const mockAsset = {
    id: 'asset-1',
    name: 'React Component Library',
    description: 'A comprehensive library of reusable React components',
    category: 'CODE_COMPONENTS',
    assetType: 'Frontend Components',
    version: '1.2.3',
    status: 'PUBLISHED',
    updatedAt: new Date('2024-01-15'),
    axon_asset_tag: [
      { id: 'tag-1', name: 'React' },
      { id: 'tag-2', name: 'Components' },
      { id: 'tag-3', name: 'UI' },
      { id: 'tag-4', name: 'Reusable' },
    ],
  };

  it('renders asset name', () => {
    render(<AssetCard asset={mockAsset} />);
    expect(screen.getByText('React Component Library')).toBeInTheDocument();
  });

  it('renders asset description', () => {
    render(<AssetCard asset={mockAsset} />);
    expect(screen.getByText(/comprehensive library/)).toBeInTheDocument();
  });

  it('renders category and asset type', () => {
    render(<AssetCard asset={mockAsset} />);
    expect(screen.getByText(/CODE_COMPONENTS.*Frontend Components/)).toBeInTheDocument();
  });

  it('renders status badge', () => {
    render(<AssetCard asset={mockAsset} />);
    expect(screen.getByText('PUBLISHED')).toBeInTheDocument();
  });

  it('renders version', () => {
    render(<AssetCard asset={mockAsset} />);
    expect(screen.getByText('1.2.3')).toBeInTheDocument();
  });

  it('renders first 3 tags', () => {
    render(<AssetCard asset={mockAsset} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
    expect(screen.getByText('UI')).toBeInTheDocument();
  });

  it('shows +more indicator for additional tags', () => {
    render(<AssetCard asset={mockAsset} />);
    expect(screen.getByText('+1 more')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<AssetCard asset={mockAsset} />);
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
  });

  it('renders as link to asset detail', () => {
    const { container } = render(<AssetCard asset={mockAsset} />);
    const link = container.querySelector('a[href*="asset-1"]');
    expect(link).toBeInTheDocument();
  });

  it('handles assets without tags', () => {
    const assetWithoutTags = { ...mockAsset, axon_asset_tag: [] };
    render(<AssetCard asset={assetWithoutTags} />);
    expect(screen.queryByText(/\+\d+/)).not.toBeInTheDocument();
  });

  it('has proper card styling', () => {
    const { container } = render(<AssetCard asset={mockAsset} />);
    const card = container.querySelector('div[class*="bg-white"]');
    expect(card).toBeInTheDocument();
  });
});

