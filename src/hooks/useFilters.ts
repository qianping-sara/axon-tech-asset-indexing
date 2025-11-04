'use client';

import { useState, useCallback, useEffect } from 'react';

export interface Asset {
  id: string;
  name: string;
  description: string;
  category: string;
  assetType: string;
  version: string;
  status: string;
  updatedAt: Date | string;
  tags?: Array<{ id: string; name: string }>;
}

export interface Filters {
  search?: string;
  category?: string;
  assetType?: string;
  status?: string;
  tags: string[];
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

interface UseFiltersReturn {
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
  results: Asset[];
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
}

export function useFilters(initialFilters?: Partial<Filters>): UseFiltersReturn {
  const [filters, setFiltersState] = useState<Filters>({
    search: initialFilters?.search,
    category: initialFilters?.category,
    assetType: initialFilters?.assetType,
    status: initialFilters?.status,
    tags: initialFilters?.tags || [],
  });

  const [results, setResults] = useState<Asset[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasMore: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const setFilters = useCallback((newFilters: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
    setPage(1); // Reset to first page when filters change
  }, []);

  // Fetch assets when filters or page changes
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.assetType) params.append('assetType', filters.assetType);
        if (filters.status) params.append('status', filters.status);
        filters.tags.forEach((tag) => params.append('tag', tag));
        params.append('page', page.toString());
        params.append('limit', '20');

        const response = await fetch(`/api/assets?${params}`);
        const data = await response.json();

        if (data.success) {
          setResults(data.data || []);
          setPagination(data.pagination || {
            page,
            limit: 20,
            total: 0,
            totalPages: 0,
            hasMore: false,
          });
        } else {
          setError('Failed to load assets');
          setResults([]);
        }
      } catch (err) {
        setError('Failed to load assets');
        setResults([]);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [filters, page]);

  return {
    filters,
    setFilters,
    results,
    pagination,
    loading,
    error,
    page,
    setPage,
  };
}

