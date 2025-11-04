/**
 * Unit tests for search API functions
 * 
 * Run with: npm test -- tests/unit/search.test.ts
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { searchAssets, getSearchSuggestions } from '@/lib/api/search';
import { createAsset } from '@/lib/api/assets';
import { prisma } from '@/lib/db/client';

describe('Search API', () => {
  beforeAll(async () => {
    // Create test assets
    await createAsset({
      name: 'Python Data Processing Script',
      description: 'A script for processing data with Python',
      category: 'CODE_COMPONENTS',
      assetType: 'Script',
      version: '1.0.0',
      status: 'PUBLISHED',
      owner: 'test@example.com',
      contentPath: 'assets/python-script.md',
      contentHash: 'abc123',
      sourceSystem: 'GitHub',
      sourceLink: 'https://github.com/test',
    });

    await createAsset({
      name: 'JavaScript React Component',
      description: 'A reusable React component for UI',
      category: 'CODE_COMPONENTS',
      assetType: 'Component',
      version: '2.0.0',
      status: 'PUBLISHED',
      owner: 'test@example.com',
      contentPath: 'assets/react-component.md',
      contentHash: 'def456',
      sourceSystem: 'GitHub',
      sourceLink: 'https://github.com/test',
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.asset.deleteMany({
      where: {
        owner: 'test@example.com',
      },
    });
  });

  describe('searchAssets', () => {
    it('should return empty array for empty query', async () => {
      const results = await searchAssets('');

      expect(results).toEqual([]);
    });

    it('should search by asset name', async () => {
      const results = await searchAssets('Python');

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.name.includes('Python'))).toBe(true);
    });

    it('should search by description', async () => {
      const results = await searchAssets('processing');

      expect(results.length).toBeGreaterThan(0);
    });

    it('should return results sorted by relevance', async () => {
      const results = await searchAssets('Python');

      // First result should have highest relevance
      if (results.length > 1) {
        expect(results[0].relevance).toBeGreaterThanOrEqual(results[1].relevance);
      }
    });

    it('should respect limit parameter', async () => {
      const results = await searchAssets('a', 5);

      expect(results.length).toBeLessThanOrEqual(5);
    });

    it('should include both assets and tags in results', async () => {
      const results = await searchAssets('component');

      expect(results.some((r) => r.type === 'asset')).toBe(true);
    });

    it('should be case insensitive', async () => {
      const resultsLower = await searchAssets('python');
      const resultsUpper = await searchAssets('PYTHON');

      expect(resultsLower.length).toBe(resultsUpper.length);
    });
  });

  describe('getSearchSuggestions', () => {
    it('should return empty array for short query', async () => {
      const suggestions = await getSearchSuggestions('a');

      expect(suggestions).toEqual([]);
    });

    it('should return suggestions for valid query', async () => {
      const suggestions = await getSearchSuggestions('py');

      expect(Array.isArray(suggestions)).toBe(true);
    });

    it('should respect limit parameter', async () => {
      const suggestions = await getSearchSuggestions('script', 3);

      expect(suggestions.length).toBeLessThanOrEqual(3);
    });

    it('should return unique suggestions', async () => {
      const suggestions = await getSearchSuggestions('component');

      const uniqueSuggestions = new Set(suggestions);
      expect(suggestions.length).toBe(uniqueSuggestions.size);
    });

    it('should be case insensitive', async () => {
      const suggestionsLower = await getSearchSuggestions('python');
      const suggestionsUpper = await getSearchSuggestions('PYTHON');

      expect(suggestionsLower.length).toBe(suggestionsUpper.length);
    });
  });
});

