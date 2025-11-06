/**
 * Integration tests for Asset Detail API endpoints
 * 
 * Run with: npm test -- tests/integration/asset-detail-api.test.ts
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createAsset } from '@/lib/api/assets';
import { prisma } from '@/lib/db/client';

describe('Asset Detail API Endpoints', () => {
  let testAssetId: string;

  beforeAll(async () => {
    // Clean up test data
    await prisma.axon_asset.deleteMany({
      where: {
        owner: 'detail-api-test@example.com',
      },
    });

    // Create test asset
    const asset = await createAsset({
      name: 'Detail API Test Asset',
      description: 'An asset for detail API endpoint testing',
      category: 'CODE_COMPONENTS',
      assetType: 'Script',
      version: '1.0.0',
      status: 'PUBLISHED',
      owner: 'detail-api-test@example.com',
      contentPath: 'assets/detail-api-test.md',
      contentHash: 'a'.repeat(64),
      sourceSystem: 'GitHub',
      sourceLink: 'https://github.com/test',
    });

    testAssetId = asset.id;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.axon_asset.deleteMany({
      where: {
        owner: 'detail-api-test@example.com',
      },
    });
  });

  describe('GET /api/assets/[id]', () => {
    it('should return asset details', async () => {
      const response = await fetch(`http://localhost:3000/api/assets/${testAssetId}`);
      const data = await response.json() as { success: boolean; data: { id: string; name: string } };

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.id).toBe(testAssetId);
      expect(data.data.name).toBe('Detail API Test Asset');
    });

    it('should return 404 for non-existent asset', async () => {
      const response = await fetch('http://localhost:3000/api/assets/nonexistent-id-xyz');
      const data = await response.json() as { success: boolean; error: string };

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Asset not found');
    });

    it('should include all relations', async () => {
      const response = await fetch(`http://localhost:3000/api/assets/${testAssetId}`);
      const data = await response.json() as { success: boolean; data: { tags: unknown[]; relations: unknown[]; relatedBy: unknown[]; versions: unknown[] } };

      expect(response.status).toBe(200);
      expect(data.data.tags).toBeDefined();
      expect(data.data.relations).toBeDefined();
      expect(data.data.relatedBy).toBeDefined();
      expect(data.data.versions).toBeDefined();
    });
  });

  describe('PUT /api/assets/[id]', () => {
    it('should update asset name', async () => {
      const response = await fetch(`http://localhost:3000/api/assets/${testAssetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Updated Asset Name',
        }),
      });
      const data = await response.json() as { success: boolean; data: { name: string } };

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.name).toBe('Updated Asset Name');
    });

    it('should update asset status', async () => {
      const response = await fetch(`http://localhost:3000/api/assets/${testAssetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'DEPRECATED',
        }),
      });
      const data = await response.json() as { success: boolean; data: { status: string } };

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.status).toBe('DEPRECATED');
    });

    it('should return 404 for non-existent asset', async () => {
      const response = await fetch('http://localhost:3000/api/assets/nonexistent-id-xyz', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Updated Name',
        }),
      });
      const data = await response.json() as { success: boolean; error: string };

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Asset not found');
    });

    it('should reject invalid update data', async () => {
      const response = await fetch(`http://localhost:3000/api/assets/${testAssetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'ab', // Too short
          status: 'INVALID_STATUS',
        }),
      });
      const data = await response.json() as { success: boolean; error: string; details: Record<string, string> };

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Validation failed');
      expect(data.details).toBeDefined();
    });
  });

  describe('DELETE /api/assets/[id]', () => {
    it('should delete an asset', async () => {
      // Create a temporary asset to delete
      const tempAsset = await createAsset({
        name: 'Temp Asset to Delete',
        description: 'This asset will be deleted via API',
        category: 'SERVICES_APIS',
        assetType: 'REST API',
        version: '1.0.0',
        status: 'PUBLISHED',
        owner: 'detail-api-test@example.com',
        contentPath: 'assets/temp-delete.md',
        contentHash: 'b'.repeat(64),
        sourceSystem: 'GitHub',
        sourceLink: 'https://github.com/temp',
      });

      const tempId = tempAsset.id;

      // Delete it
      const response = await fetch(`http://localhost:3000/api/assets/${tempId}`, {
        method: 'DELETE',
      });
      const data = await response.json() as { success: boolean; message: string };

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Asset deleted successfully');

      // Verify it's deleted
      const getResponse = await fetch(`http://localhost:3000/api/assets/${tempId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent asset', async () => {
      const response = await fetch('http://localhost:3000/api/assets/nonexistent-id-xyz', {
        method: 'DELETE',
      });
      const data = await response.json() as { success: boolean; error: string };

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Asset not found');
    });
  });
});

