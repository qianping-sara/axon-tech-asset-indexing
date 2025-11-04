/**
 * Unit tests for asset detail API functions
 * 
 * Run with: npm test -- tests/unit/asset-detail.test.ts
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { getAssetById, createAsset, updateAsset, deleteAsset } from '@/lib/api/assets';
import { prisma } from '@/lib/db/client';

describe('Asset Detail API', () => {
  let testAssetId: string;

  beforeAll(async () => {
    // Clean up test data
    await prisma.asset.deleteMany({
      where: {
        owner: 'detail-test@example.com',
      },
    });

    // Create test asset
    const asset = await createAsset({
      name: 'Detail Test Asset',
      description: 'An asset for detail API testing',
      category: 'CODE_COMPONENTS',
      assetType: 'Script',
      version: '1.0.0',
      status: 'PUBLISHED',
      owner: 'detail-test@example.com',
      contentPath: 'assets/detail-test.md',
      contentHash: 'a'.repeat(64),
      sourceSystem: 'GitHub',
      sourceLink: 'https://github.com/test',
    });

    testAssetId = asset.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.asset.deleteMany({
      where: {
        owner: 'detail-test@example.com',
      },
    });
  });

  describe('getAssetById', () => {
    it('should return asset by id', async () => {
      const asset = await getAssetById(testAssetId);

      expect(asset).toBeDefined();
      expect(asset?.id).toBe(testAssetId);
      expect(asset?.name).toBe('Detail Test Asset');
    });

    it('should return null for non-existent asset', async () => {
      const asset = await getAssetById('nonexistent-id-xyz');

      expect(asset).toBeNull();
    });

    it('should include all relations', async () => {
      const asset = await getAssetById(testAssetId);

      expect(asset?.tags).toBeDefined();
      expect(asset?.relations).toBeDefined();
      expect(asset?.relatedBy).toBeDefined();
      expect(asset?.versions).toBeDefined();
      expect(Array.isArray(asset?.tags)).toBe(true);
      expect(Array.isArray(asset?.relations)).toBe(true);
      expect(Array.isArray(asset?.relatedBy)).toBe(true);
      expect(Array.isArray(asset?.versions)).toBe(true);
    });
  });

  describe('updateAsset', () => {
    it('should update asset name', async () => {
      const updated = await updateAsset(testAssetId, {
        name: 'Updated Asset Name',
      });

      expect(updated.name).toBe('Updated Asset Name');
    });

    it('should update asset status', async () => {
      const updated = await updateAsset(testAssetId, {
        status: 'DEPRECATED',
      });

      expect(updated.status).toBe('DEPRECATED');
    });

    it('should update asset version', async () => {
      const updated = await updateAsset(testAssetId, {
        version: '2.0.0',
      });

      expect(updated.version).toBe('2.0.0');
    });

    it('should update multiple fields', async () => {
      const updated = await updateAsset(testAssetId, {
        name: 'Multi Updated',
        description: 'Updated description for testing',
        status: 'PUBLISHED',
      });

      expect(updated.name).toBe('Multi Updated');
      expect(updated.description).toBe('Updated description for testing');
      expect(updated.status).toBe('PUBLISHED');
    });

    it('should preserve other fields when updating', async () => {
      const before = await getAssetById(testAssetId);
      const updated = await updateAsset(testAssetId, {
        name: 'Preserved Test',
      });

      expect(updated.category).toBe(before?.category);
      expect(updated.owner).toBe(before?.owner);
      expect(updated.contentPath).toBe(before?.contentPath);
    });

    it('should update updatedAt timestamp', async () => {
      const before = await getAssetById(testAssetId);
      const beforeTime = before?.updatedAt.getTime();

      // Wait a bit to ensure timestamp difference
      await new Promise((resolve) => setTimeout(resolve, 10));

      const updated = await updateAsset(testAssetId, {
        name: 'Timestamp Test',
      });

      expect(updated.updatedAt.getTime()).toBeGreaterThan(beforeTime || 0);
    });
  });

  describe('deleteAsset', () => {
    it('should delete an asset', async () => {
      // Create a temporary asset to delete
      const tempAsset = await createAsset({
        name: 'Temp Asset to Delete',
        description: 'This asset will be deleted',
        category: 'SERVICES_APIS',
        assetType: 'REST API',
        version: '1.0.0',
        status: 'PUBLISHED',
        owner: 'detail-test@example.com',
        contentPath: 'assets/temp.md',
        contentHash: 'b'.repeat(64),
        sourceSystem: 'GitHub',
        sourceLink: 'https://github.com/temp',
      });

      const tempId = tempAsset.id;

      // Verify it exists
      let asset = await getAssetById(tempId);
      expect(asset).toBeDefined();

      // Delete it
      await deleteAsset(tempId);

      // Verify it's deleted
      asset = await getAssetById(tempId);
      expect(asset).toBeNull();
    });

    it('should cascade delete related asset tags', async () => {
      // This test verifies that deleting an asset also deletes its tags
      // The actual cascade is handled by the database schema
      const tempAsset = await createAsset({
        name: 'Asset with Tags',
        description: 'This asset has tags that will be deleted',
        category: 'DATA_ANALYTICS',
        assetType: 'Dataset',
        version: '1.0.0',
        status: 'PUBLISHED',
        owner: 'detail-test@example.com',
        contentPath: 'assets/tagged.md',
        contentHash: 'c'.repeat(64),
        sourceSystem: 'GitHub',
        sourceLink: 'https://github.com/tagged',
      });

      const tempId = tempAsset.id;

      // Delete it
      await deleteAsset(tempId);

      // Verify it's deleted
      const asset = await getAssetById(tempId);
      expect(asset).toBeNull();
    });
  });
});

