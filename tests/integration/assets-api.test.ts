/**
 * Integration tests for Asset API endpoints
 * 
 * Run with: npm test -- tests/integration/assets-api.test.ts
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createAsset } from '@/lib/api/assets';
import { prisma } from '@/lib/db/client';

describe('Asset API Endpoints', () => {
  beforeAll(async () => {
    // Clean up test data
    await prisma.asset.deleteMany({
      where: {
        owner: 'api-test@example.com',
      },
    });

    // Create test asset
    await createAsset({
      name: 'API Test Asset',
      description: 'An asset for API testing',
      category: 'CODE_COMPONENTS',
      assetType: 'Script',
      version: '1.0.0',
      status: 'PUBLISHED',
      owner: 'api-test@example.com',
      contentPath: 'assets/api-test.md',
      contentHash: 'test123',
      sourceSystem: 'GitHub',
      sourceLink: 'https://github.com/test',
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.asset.deleteMany({
      where: {
        owner: 'api-test@example.com',
      },
    });
  });

  describe('GET /api/assets', () => {
    it('should return assets with pagination', async () => {
      const response = await fetch('http://localhost:3000/api/assets');
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      expect(data.pagination).toBeDefined();
      expect(data.pagination.page).toBe(1);
      expect(data.pagination.limit).toBe(20);
    });

    it('should filter by category', async () => {
      const response = await fetch(
        'http://localhost:3000/api/assets?category=CODE_COMPONENTS'
      );
      const data = await response.json() as { success: boolean; data: Array<{ category: string }> };

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.every((asset) => asset.category === 'CODE_COMPONENTS')).toBe(true);
    });

    it('should filter by status', async () => {
      const response = await fetch(
        'http://localhost:3000/api/assets?status=PUBLISHED'
      );
      const data = await response.json() as { success: boolean; data: Array<{ status: string }> };

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.every((asset) => asset.status === 'PUBLISHED')).toBe(true);
    });

    it('should search by keyword', async () => {
      const response = await fetch(
        'http://localhost:3000/api/assets?search=API%20Test'
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.length).toBeGreaterThan(0);
    });

    it('should respect pagination parameters', async () => {
      const response = await fetch(
        'http://localhost:3000/api/assets?page=1&limit=5'
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.pagination.limit).toBe(5);
      expect(data.data.length).toBeLessThanOrEqual(5);
    });

    it('should enforce max limit', async () => {
      const response = await fetch(
        'http://localhost:3000/api/assets?limit=1000'
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.pagination.limit).toBeLessThanOrEqual(100);
    });
  });

  describe('GET /api/search', () => {
    it('should return error when query is missing', async () => {
      const response = await fetch('http://localhost:3000/api/search');
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });

    it('should search assets and tags', async () => {
      const response = await fetch(
        'http://localhost:3000/api/search?q=API%20Test'
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      expect(data.query).toBe('API Test');
    });

    it('should return search suggestions', async () => {
      const response = await fetch(
        'http://localhost:3000/api/search?q=API&suggestions=true'
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data)).toBe(true);
    });

    it('should respect limit parameter', async () => {
      const response = await fetch(
        'http://localhost:3000/api/search?q=a&limit=5'
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.length).toBeLessThanOrEqual(5);
    });
  });

  describe('POST /api/assets', () => {
    it('should create a new asset', async () => {
      const response = await fetch('http://localhost:3000/api/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'New API Asset',
          description: 'Created via API',
          category: 'SERVICES_APIS',
          assetType: 'REST API',
          version: '1.0.0',
          status: 'PUBLISHED',
          owner: 'api-test@example.com',
          contentPath: 'assets/new-api.md',
          contentHash: 'new123',
          sourceSystem: 'GitHub',
          sourceLink: 'https://github.com/test/new',
        }),
      });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.id).toBeDefined();
      expect(data.data.name).toBe('New API Asset');
    });

    it('should return error for missing required fields', async () => {
      const response = await fetch('http://localhost:3000/api/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Incomplete Asset',
          // Missing other required fields
        }),
      });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });
  });
});

