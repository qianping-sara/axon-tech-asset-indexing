'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  type: 'asset' | 'tag';
  category?: string;
  assetType?: string;
}

interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  search: (q: string) => Promise<void>;
}

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/search?q=${encodeURIComponent(q)}`
      );
      const data = await response.json();

      if (data.success) {
        setResults(data.data || []);
      } else {
        setError('Search failed');
        setResults([]);
      }
    } catch (err) {
      setError('Search failed');
      setResults([]);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!query.trim()) {
      setResults([]);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      void search(query);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, search]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    search,
  };
}

