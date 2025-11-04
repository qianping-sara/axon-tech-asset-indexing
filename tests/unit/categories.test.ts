/**
 * Unit tests for categories API functions
 * 
 * Run with: npm test -- tests/unit/categories.test.ts
 */

import { describe, it, expect } from '@jest/globals';
import {
  getCategories,
  getCategoryDetail,
  getCategoryStats,
  getValidCategories,
  isValidCategory,
} from '@/lib/api/categories';

describe('Categories API', () => {
  describe('getCategories', () => {
    it('should return all categories', async () => {
      const categories = await getCategories();

      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBe(6);
    });

    it('should include required fields', async () => {
      const categories = await getCategories();

      categories.forEach((category) => {
        expect(category.name).toBeDefined();
        expect(category.description).toBeDefined();
        expect(typeof category.assetCount).toBe('number');
      });
    });

    it('should include all expected categories', async () => {
      const categories = await getCategories();
      const names = categories.map((c) => c.name);

      expect(names).toContain('CODE_COMPONENTS');
      expect(names).toContain('SERVICES_APIS');
      expect(names).toContain('AUTOMATION_WORKFLOWS');
      expect(names).toContain('DATA_ANALYTICS');
      expect(names).toContain('ARCHITECTURE_GOVERNANCE');
      expect(names).toContain('KNOWLEDGE_PRACTICES');
    });

    it('should have descriptions for all categories', async () => {
      const categories = await getCategories();

      categories.forEach((category) => {
        expect(category.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getCategoryDetail', () => {
    it('should return category detail for valid category', async () => {
      const detail = await getCategoryDetail('CODE_COMPONENTS');

      expect(detail).toBeDefined();
      expect(detail?.name).toBe('CODE_COMPONENTS');
      expect(detail?.description).toBeDefined();
      expect(Array.isArray(detail?.assets)).toBe(true);
    });

    it('should include asset count', async () => {
      const detail = await getCategoryDetail('CODE_COMPONENTS');

      expect(detail?.assetCount).toBeDefined();
      expect(typeof detail?.assetCount).toBe('number');
    });

    it('should return null for invalid category', async () => {
      const detail = await getCategoryDetail('INVALID_CATEGORY');

      expect(detail).toBeNull();
    });

    it('should include assets with required fields', async () => {
      const detail = await getCategoryDetail('CODE_COMPONENTS');

      if (detail && detail.assets.length > 0) {
        detail.assets.forEach((asset) => {
          expect(asset.id).toBeDefined();
          expect(asset.name).toBeDefined();
          expect(asset.status).toBeDefined();
          expect(asset.version).toBeDefined();
          expect(asset.owner).toBeDefined();
        });
      }
    });
  });

  describe('getCategoryStats', () => {
    it('should return stats for all categories', async () => {
      const stats = await getCategoryStats();

      expect(Array.isArray(stats)).toBe(true);
      expect(stats.length).toBe(6);
    });

    it('should include status breakdown', async () => {
      const stats = await getCategoryStats();

      stats.forEach((stat) => {
        expect(stat.name).toBeDefined();
        expect(typeof stat.total).toBe('number');
        expect(typeof stat.published).toBe('number');
        expect(typeof stat.draft).toBe('number');
        expect(typeof stat.deprecated).toBe('number');
        expect(typeof stat.archived).toBe('number');
      });
    });

    it('should have correct total count', async () => {
      const stats = await getCategoryStats();

      stats.forEach((stat) => {
        const sum = stat.published + stat.draft + stat.deprecated + stat.archived;
        expect(sum).toBe(stat.total);
      });
    });
  });

  describe('getValidCategories', () => {
    it('should return array of valid categories', () => {
      const categories = getValidCategories();

      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBe(6);
    });

    it('should include all expected categories', () => {
      const categories = getValidCategories();

      expect(categories).toContain('CODE_COMPONENTS');
      expect(categories).toContain('SERVICES_APIS');
      expect(categories).toContain('AUTOMATION_WORKFLOWS');
      expect(categories).toContain('DATA_ANALYTICS');
      expect(categories).toContain('ARCHITECTURE_GOVERNANCE');
      expect(categories).toContain('KNOWLEDGE_PRACTICES');
    });
  });

  describe('isValidCategory', () => {
    it('should return true for valid categories', () => {
      expect(isValidCategory('CODE_COMPONENTS')).toBe(true);
      expect(isValidCategory('SERVICES_APIS')).toBe(true);
      expect(isValidCategory('AUTOMATION_WORKFLOWS')).toBe(true);
      expect(isValidCategory('DATA_ANALYTICS')).toBe(true);
      expect(isValidCategory('ARCHITECTURE_GOVERNANCE')).toBe(true);
      expect(isValidCategory('KNOWLEDGE_PRACTICES')).toBe(true);
    });

    it('should return false for invalid categories', () => {
      expect(isValidCategory('INVALID')).toBe(false);
      expect(isValidCategory('invalid')).toBe(false);
      expect(isValidCategory('')).toBe(false);
      expect(isValidCategory('code_components')).toBe(false);
    });
  });
});

