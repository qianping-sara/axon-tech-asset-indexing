/**
 * Unit tests for tags API functions
 * 
 * Run with: npm test -- tests/unit/tags.test.ts
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { getTags, getTagById, createTag, updateTag, deleteTag, getTagsByCategory } from '@/lib/api/tags';
import { prisma } from '@/lib/db/client';

describe('Tags API', () => {
  let testTagId: string;

  beforeAll(async () => {
    // Clean up test data
    await prisma.tag.deleteMany({
      where: {
        category: 'test-category',
      },
    });

    // Create test tag
    const tag = await createTag({
      name: 'test-tag-' + Date.now(),
      description: 'A test tag for unit testing',
      category: 'test-category',
    });

    testTagId = tag.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.tag.deleteMany({
      where: {
        category: 'test-category',
      },
    });
  });

  describe('getTags', () => {
    it('should return paginated tags', async () => {
      const result = await getTags({ page: 1, limit: 10 });

      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.pagination).toBeDefined();
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.limit).toBe(10);
    });

    it('should filter tags by category', async () => {
      const result = await getTags({ category: 'test-category' });

      expect(result.data.length).toBeGreaterThan(0);
      result.data.forEach((tag) => {
        expect(tag.category).toBe('test-category');
      });
    });

    it('should search tags by name', async () => {
      const result = await getTags({ search: 'test-tag' });

      expect(result.data.length).toBeGreaterThan(0);
    });

    it('should sort tags by name', async () => {
      const result = await getTags({ sortBy: 'name', sortOrder: 'asc' });

      expect(result.data.length).toBeGreaterThan(0);
      for (let i = 1; i < result.data.length; i++) {
        expect(result.data[i].name.localeCompare(result.data[i - 1].name)).toBeGreaterThanOrEqual(0);
      }
    });

    it('should include asset count', async () => {
      const result = await getTags({ limit: 1 });

      if (result.data.length > 0) {
        expect(result.data[0].assetCount).toBeDefined();
        expect(typeof result.data[0].assetCount).toBe('number');
      }
    });
  });

  describe('getTagById', () => {
    it('should return tag by id', async () => {
      const tag = await getTagById(testTagId);

      expect(tag).toBeDefined();
      expect(tag?.id).toBe(testTagId);
      expect(tag?.name).toBeDefined();
    });

    it('should include asset count', async () => {
      const tag = await getTagById(testTagId);

      expect(tag?._count).toBeDefined();
      expect(tag?._count.assets).toBeDefined();
    });

    it('should return null for non-existent tag', async () => {
      const tag = await getTagById('nonexistent-id-xyz');

      expect(tag).toBeNull();
    });
  });

  describe('createTag', () => {
    it('should create a new tag', async () => {
      const tag = await createTag({
        name: 'new-tag-' + Date.now(),
        description: 'A new test tag',
        category: 'test-category',
      });

      expect(tag.id).toBeDefined();
      expect(tag.name).toBeDefined();
      expect(tag.category).toBe('test-category');

      // Clean up
      await deleteTag(tag.id);
    });

    it('should include asset count', async () => {
      const tag = await createTag({
        name: 'counted-tag-' + Date.now(),
        category: 'test-category',
      });

      expect(tag._count).toBeDefined();
      expect(tag._count.assets).toBe(0);

      // Clean up
      await deleteTag(tag.id);
    });
  });

  describe('updateTag', () => {
    it('should update tag name', async () => {
      const updated = await updateTag(testTagId, {
        name: 'updated-tag-' + Date.now(),
      });

      expect(updated.name).toBeDefined();
    });

    it('should update tag description', async () => {
      const updated = await updateTag(testTagId, {
        description: 'Updated description',
      });

      expect(updated.description).toBe('Updated description');
    });

    it('should update tag category', async () => {
      const updated = await updateTag(testTagId, {
        category: 'test-category-updated',
      });

      expect(updated.category).toBe('test-category-updated');

      // Restore original category
      await updateTag(testTagId, { category: 'test-category' });
    });
  });

  describe('deleteTag', () => {
    it('should delete a tag', async () => {
      const tag = await createTag({
        name: 'tag-to-delete-' + Date.now(),
        category: 'test-category',
      });

      const tagId = tag.id;

      // Verify it exists
      let retrieved = await getTagById(tagId);
      expect(retrieved).toBeDefined();

      // Delete it
      await deleteTag(tagId);

      // Verify it's deleted
      retrieved = await getTagById(tagId);
      expect(retrieved).toBeNull();
    });
  });

  describe('getTagsByCategory', () => {
    it('should return tags by category', async () => {
      const tags = await getTagsByCategory('test-category');

      expect(Array.isArray(tags)).toBe(true);
      tags.forEach((tag) => {
        expect(tag.category).toBe('test-category');
      });
    });

    it('should return empty array for non-existent category', async () => {
      const tags = await getTagsByCategory('nonexistent-category-xyz');

      expect(Array.isArray(tags)).toBe(true);
      expect(tags.length).toBe(0);
    });
  });
});

