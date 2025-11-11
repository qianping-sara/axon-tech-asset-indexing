/**
 * Unit tests for validation utilities
 * 
 * Run with: npm test -- tests/unit/validation.test.ts
 */

import { describe, it, expect } from '@jest/globals';
import {
  validateAssetName,
  validateAssetDescription,
  validateCategory,
  validateStatus,
  validateVersion,
  validateEmail,
  validateUrl,
  validateAssetType,
  validateContentPath,
  validateContentHash,
  validateAssetCreation,
  validateAssetUpdate,
} from '@/lib/utils/validation';

describe('Validation Utilities', () => {
  describe('validateAssetName', () => {
    it('should accept valid names', () => {
      expect(validateAssetName('Valid Asset Name')).toBeNull();
      expect(validateAssetName('Python Script')).toBeNull();
    });

    it('should reject names that are too short', () => {
      expect(validateAssetName('ab')).not.toBeNull();
    });

    it('should reject names that are too long', () => {
      expect(validateAssetName('a'.repeat(256))).not.toBeNull();
    });

    it('should reject empty names', () => {
      expect(validateAssetName('')).not.toBeNull();
    });
  });

  describe('validateAssetDescription', () => {
    it('should accept valid descriptions', () => {
      expect(validateAssetDescription('This is a valid description')).toBeNull();
    });

    it('should reject descriptions that are too short', () => {
      expect(validateAssetDescription('short')).not.toBeNull();
    });

    it('should reject descriptions that are too long', () => {
      expect(validateAssetDescription('a'.repeat(5001))).not.toBeNull();
    });
  });

  describe('validateCategory', () => {
    it('should accept valid categories', () => {
      expect(validateCategory('CODE_COMPONENTS')).toBeNull();
      expect(validateCategory('SERVICES_APIS')).toBeNull();
      expect(validateCategory('AUTOMATION_WORKFLOWS')).toBeNull();
    });

    it('should reject invalid categories', () => {
      expect(validateCategory('INVALID_CATEGORY')).not.toBeNull();
    });
  });

  describe('validateStatus', () => {
    it('should accept valid statuses', () => {
      expect(validateStatus('DRAFT')).toBeNull();
      expect(validateStatus('PUBLISHED')).toBeNull();
      expect(validateStatus('DEPRECATED')).toBeNull();
      expect(validateStatus('ARCHIVED')).toBeNull();
    });

    it('should reject invalid statuses', () => {
      expect(validateStatus('INVALID_STATUS')).not.toBeNull();
    });
  });

  describe('validateVersion', () => {
    it('should accept valid versions', () => {
      expect(validateVersion('1.0.0')).toBeNull();
      expect(validateVersion('2.1.3')).toBeNull();
      expect(validateVersion('1.0.0-beta')).toBeNull();
    });

    it('should reject invalid versions', () => {
      expect(validateVersion('invalid')).not.toBeNull();
      expect(validateVersion('1.0')).not.toBeNull();
    });
  });

  describe('validateEmail', () => {
    it('should accept valid emails', () => {
      expect(validateEmail('user@example.com')).toBeNull();
      expect(validateEmail('team@company.co.uk')).toBeNull();
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('invalid-email')).not.toBeNull();
      expect(validateEmail('user@')).not.toBeNull();
    });
  });

  describe('validateUrl', () => {
    it('should accept valid URLs', () => {
      expect(validateUrl('https://github.com/example')).toBeNull();
      expect(validateUrl('http://example.com')).toBeNull();
    });

    it('should reject invalid URLs', () => {
      expect(validateUrl('not-a-url')).not.toBeNull();
      expect(validateUrl('just text')).not.toBeNull();
    });
  });

  describe('validateAssetType', () => {
    it('should accept valid asset types', () => {
      expect(validateAssetType('Script')).toBeNull();
      expect(validateAssetType('REST API')).toBeNull();
    });

    it('should reject asset types that are too long', () => {
      expect(validateAssetType('a'.repeat(101))).not.toBeNull();
    });
  });

  describe('validateContentPath', () => {
    it('should accept valid content paths', () => {
      expect(validateContentPath('assets/code/script.md')).toBeNull();
      expect(validateContentPath('assets/api/rest.md')).toBeNull();
    });

    it('should reject paths that do not start with assets/', () => {
      expect(validateContentPath('code/script.md')).not.toBeNull();
    });

    it('should reject paths that are too long', () => {
      expect(validateContentPath('assets/' + 'a'.repeat(500))).not.toBeNull();
    });
  });

  describe('validateContentHash', () => {
    it('should accept valid SHA256 hashes', () => {
      const validHash = 'a'.repeat(64);
      expect(validateContentHash(validHash)).toBeNull();
    });

    it('should reject invalid hashes', () => {
      expect(validateContentHash('invalid')).not.toBeNull();
      expect(validateContentHash('a'.repeat(63))).not.toBeNull();
    });
  });

  describe('validateAssetCreation', () => {
    it('should accept valid asset data', () => {
      const validData = {
        name: 'Test Asset',
        description: 'This is a test asset description',
        category: 'CODE_COMPONENTS',
        assetType: 'Script',
        version: '1.0.0',
        status: 'PUBLISHED',
        owner: 'user@example.com',
        contentPath: 'assets/test.md',
        contentHash: 'a'.repeat(64),
        sourceSystem: 'GitHub',
        sourceLink: 'https://github.com/test',
      };

      const result = validateAssetCreation(validData);
      expect(result.valid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('should reject data with missing required fields', () => {
      const invalidData = {
        name: 'Test Asset',
        // Missing other required fields
      };

      const result = validateAssetCreation(invalidData);
      expect(result.valid).toBe(false);
      expect(Object.keys(result.errors).length).toBeGreaterThan(0);
    });

    it('should reject data with invalid field values', () => {
      const invalidData = {
        name: 'ab', // Too short
        description: 'This is a test asset description',
        category: 'INVALID_CATEGORY',
        assetType: 'Script',
        version: '1.0.0',
        status: 'PUBLISHED',
        owner: 'invalid-email',
        contentPath: 'assets/test.md',
        contentHash: 'invalid-hash',
        sourceSystem: 'GitHub',
        sourceLink: 'not-a-url',
      };

      const result = validateAssetCreation(invalidData);
      expect(result.valid).toBe(false);
      expect(Object.keys(result.errors).length).toBeGreaterThan(0);
    });
  });

  describe('validateAssetUpdate', () => {
    it('should accept partial update data', () => {
      const updateData = {
        name: 'Updated Name',
        status: 'PUBLISHED',
      };

      const result = validateAssetUpdate(updateData);
      expect(result.valid).toBe(true);
    });

    it('should accept empty update data', () => {
      const result = validateAssetUpdate({});
      expect(result.valid).toBe(true);
    });

    it('should reject invalid field values', () => {
      const invalidData = {
        name: 'ab', // Too short
        status: 'INVALID_STATUS',
      };

      const result = validateAssetUpdate(invalidData);
      expect(result.valid).toBe(false);
    });
  });
});

