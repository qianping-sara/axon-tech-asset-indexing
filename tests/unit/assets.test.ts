/**
 * Unit tests for asset API functions
 * 
 * Run with: npm test -- tests/unit/assets.test.ts
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { getAssets, getAssetById, createAsset, deleteAsset } from '@/lib/api/assets';
import { prisma } from '@/lib/db/client';

describe('Asset API', () => {
  let testAssetId: string;

  beforeAll(async () => {
    // Clean up test data
    await prisma.axon_asset.deleteMany({
      where: {
        owner: 'test@example.com',
      },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.axon_asset.deleteMany({
      where: {
        owner: 'test@example.com',
      },
    });
  });

  describe('getAssets', () => {
    it('should return empty list when no assets exist', async () => {
      const result = await getAssets({
        search: 'nonexistent-asset-xyz',
      });

      expect(result.data).toEqual([]);
      expect(result.pagination.total).toBe(0);
    });

    it('should return paginated results', async () => {
      // Create test asset
      await createAsset({
        name: 'Test Asset 1',
        description: 'Test description',
        category: 'CODE_COMPONENTS',
        assetType: 'Script',
        version: '1.0.0',
        status: 'PUBLISHED',
        owner: 'test@example.com',
        contentPath: 'assets/test.md',
        contentHash: 'abc123',
        sourceSystem: 'GitHub',
        sourceLink: 'https://github.com/test',
      });

      const result = await getAssets({
        page: 1,
        limit: 10,
      });

      expect(result.pagination.page).toBe(1);
      expect(result.pagination.limit).toBe(10);
      expect(result.pagination.total).toBeGreaterThanOrEqual(1);
    });

    it('should filter by category', async () => {
      const result = await getAssets({
        category: 'CODE_COMPONENTS',
      });

      expect(result.data.every((asset) => asset.category === 'CODE_COMPONENTS')).toBe(true);
    });

    it('should filter by status', async () => {
      const result = await getAssets({
        status: 'PUBLISHED',
      });

      expect(result.data.every((asset) => asset.status === 'PUBLISHED')).toBe(true);
    });

    it('should search by name', async () => {
      const result = await getAssets({
        search: 'Test Asset',
      });

      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0].name).toContain('Test Asset');
    });

    it('should respect limit parameter', async () => {
      const result = await getAssets({
        limit: 5,
      });

      expect(result.data.length).toBeLessThanOrEqual(5);
    });

    it('should not exceed max limit', async () => {
      const result = await getAssets({
        limit: 1000,
      });

      expect(result.pagination.limit).toBeLessThanOrEqual(100);
    });
  });

  describe('createAsset', () => {
    it('should create a new asset', async () => {
      const asset = await createAsset({
        name: 'New Test Asset',
        description: 'A new test asset',
        category: 'SERVICES_APIS',
        assetType: 'REST API',
        version: '2.0.0',
        status: 'PUBLISHED',
        owner: 'test@example.com',
        contentPath: 'assets/api.md',
        contentHash: 'def456',
        sourceSystem: 'GitHub',
        sourceLink: 'https://github.com/test/api',
      });

      expect(asset.id).toBeDefined();
      expect(asset.name).toBe('New Test Asset');
      expect(asset.category).toBe('SERVICES_APIS');
      testAssetId = asset.id;
    });
  });

  describe('getAssetById', () => {
    it('should return asset by id', async () => {
      if (!testAssetId) {
        throw new Error('testAssetId not set');
      }

      const asset = await getAssetById(testAssetId);

      expect(asset).toBeDefined();
      expect(asset?.id).toBe(testAssetId);
      expect(asset?.name).toBe('New Test Asset');
    });

    it('should return null for non-existent asset', async () => {
      const asset = await getAssetById('nonexistent-id-xyz');

      expect(asset).toBeNull();
    });

    it('should include relations', async () => {
      if (!testAssetId) {
        throw new Error('testAssetId not set');
      }

      const asset = await getAssetById(testAssetId);

      expect(asset?.axon_asset_tag).toBeDefined();
      expect(asset?.axon_asset_relation_axon_asset_relation_fromAssetIdToaxon_asset).toBeDefined();
      expect(asset?.axon_asset_relation_axon_asset_relation_toAssetIdToaxon_asset).toBeDefined();
      expect(asset?.axon_asset_version).toBeDefined();
    });
  });

  describe('deleteAsset', () => {
    it('should delete an asset', async () => {
      if (!testAssetId) {
        throw new Error('testAssetId not set');
      }

      await deleteAsset(testAssetId);

      const asset = await getAssetById(testAssetId);
      expect(asset).toBeNull();
    });
  });
});

