/**
 * Unit tests for sync business logic
 * 
 * Run with: npm test -- tests/unit/sync.test.ts
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { prisma } from '@/lib/db/client';
import { syncAssetFile, deleteAssetByPath, getSyncStatus } from '@/lib/api/sync';

describe('Sync Business Logic', () => {
  const testFilePath = `assets/code/test-sync-${Date.now()}.md`;
  const testAssetMarkdown = `---
name: "Sync Test Asset"
description: "Test asset for sync functionality"
category: "CODE_COMPONENTS"
assetType: "Script"
version: "1.0.0"
status: "PUBLISHED"
owner: "test@example.com"
tags:
  - test
  - sync
---

# Sync Test Asset

This is a test asset for sync functionality.
`;

  beforeAll(async () => {
    // Clean up any existing test data
    await prisma.asset.deleteMany({
      where: {
        contentPath: testFilePath,
      },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.asset.deleteMany({
      where: {
        contentPath: testFilePath,
      },
    });
  });

  describe('syncAssetFile', () => {
    it('should create new asset', async () => {
      const result = await syncAssetFile(testFilePath, testAssetMarkdown);

      expect(result.created).toBe(true);
      expect(result.updated).toBe(false);

      // Verify asset was created
      const asset = await prisma.asset.findFirst({
        where: { contentPath: testFilePath },
      });

      expect(asset).toBeDefined();
      expect(asset?.name).toBe('Sync Test Asset');
      expect(asset?.status).toBe('PUBLISHED');
    });

    it('should not update if content hash is same', async () => {
      // First sync
      await syncAssetFile(testFilePath, testAssetMarkdown);

      // Second sync with same content
      const result = await syncAssetFile(testFilePath, testAssetMarkdown);

      expect(result.created).toBe(false);
      expect(result.updated).toBe(false);
    });

    it('should update if content has changed', async () => {
      // First sync
      await syncAssetFile(testFilePath, testAssetMarkdown);

      // Update content
      const updatedMarkdown = testAssetMarkdown.replace(
        'Sync Test Asset',
        'Updated Sync Test Asset'
      );

      const result = await syncAssetFile(testFilePath, updatedMarkdown);

      expect(result.created).toBe(false);
      expect(result.updated).toBe(true);

      // Verify asset was updated
      const asset = await prisma.asset.findFirst({
        where: { contentPath: testFilePath },
      });

      expect(asset?.name).toBe('Updated Sync Test Asset');
    });

    it('should reject invalid asset metadata', async () => {
      const invalidMarkdown = `---
name: ""
description: ""
---

Content`;

      await expect(syncAssetFile(testFilePath, invalidMarkdown)).rejects.toThrow();
    });
  });

  describe('deleteAssetByPath', () => {
    it('should delete asset by path', async () => {
      const filePath = `assets/code/delete-test-${Date.now()}.md`;

      // Create asset
      await syncAssetFile(filePath, testAssetMarkdown);

      // Verify it exists
      let asset = await prisma.asset.findFirst({
        where: { contentPath: filePath },
      });
      expect(asset).toBeDefined();

      // Delete asset
      await deleteAssetByPath(filePath);

      // Verify it's deleted
      asset = await prisma.asset.findFirst({
        where: { contentPath: filePath },
      });
      expect(asset).toBeNull();
    });

    it('should handle non-existent paths gracefully', async () => {
      const nonExistentPath = 'assets/code/non-existent.md';

      // Should not throw
      await expect(deleteAssetByPath(nonExistentPath)).resolves.not.toThrow();
    });
  });

  describe('getSyncStatus', () => {
    it('should return sync status', async () => {
      const status = await getSyncStatus();

      expect(status).toBeDefined();
      expect(typeof status.totalAssets).toBe('number');
      expect(typeof status.publishedAssets).toBe('number');
      expect(typeof status.draftAssets).toBe('number');
    });

    it('should have correct asset counts', async () => {
      const status = await getSyncStatus();

      expect(status.totalAssets).toBeGreaterThanOrEqual(0);
      expect(status.publishedAssets).toBeGreaterThanOrEqual(0);
      expect(status.draftAssets).toBeGreaterThanOrEqual(0);
      expect(status.publishedAssets + status.draftAssets).toBeLessThanOrEqual(
        status.totalAssets
      );
    });
  });
});

