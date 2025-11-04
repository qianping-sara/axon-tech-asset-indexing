/**
 * Unit tests for hash and webhook utilities
 * 
 * Run with: npm test -- tests/unit/hash-webhook.test.ts
 */

import { describe, it, expect } from '@jest/globals';
import { createHmac } from 'crypto';
import {
  calculateSHA256,
  calculateFileHash,
  verifyHash,
  calculateFrontmatterHash,
  calculateCombinedHash,
} from '@/lib/utils/hash';
import {
  verifyGitHubWebhookSignature,
  extractFileChanges,
  isPushEvent,
  getBranchName,
  GitHubWebhookPayload,
} from '@/lib/utils/webhook';

describe('Hash Utilities', () => {
  describe('calculateSHA256', () => {
    it('should calculate SHA256 hash', () => {
      const content = 'test content';
      const hash = calculateSHA256(content);

      expect(hash).toBeDefined();
      expect(hash.length).toBe(64); // SHA256 produces 64 hex characters
      expect(/^[a-f0-9]{64}$/.test(hash)).toBe(true);
    });

    it('should produce consistent hashes', () => {
      const content = 'test content';
      const hash1 = calculateSHA256(content);
      const hash2 = calculateSHA256(content);

      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different content', () => {
      const hash1 = calculateSHA256('content1');
      const hash2 = calculateSHA256('content2');

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('calculateFileHash', () => {
    it('should normalize line endings', () => {
      const content1 = 'line1\nline2\nline3';
      const content2 = 'line1\r\nline2\r\nline3';

      const hash1 = calculateFileHash(content1);
      const hash2 = calculateFileHash(content2);

      expect(hash1).toBe(hash2);
    });

    it('should trim whitespace', () => {
      const content1 = 'content';
      const content2 = '  content  \n';

      const hash1 = calculateFileHash(content1);
      const hash2 = calculateFileHash(content2);

      expect(hash1).toBe(hash2);
    });
  });

  describe('verifyHash', () => {
    it('should verify correct hash', () => {
      const content = 'test content';
      const hash = calculateFileHash(content);

      expect(verifyHash(content, hash)).toBe(true);
    });

    it('should reject incorrect hash', () => {
      const content = 'test content';
      const wrongHash = 'a'.repeat(64);

      expect(verifyHash(content, wrongHash)).toBe(false);
    });
  });

  describe('calculateFrontmatterHash', () => {
    it('should calculate frontmatter hash', () => {
      const frontmatter = {
        name: 'Test',
        version: '1.0.0',
      };

      const hash = calculateFrontmatterHash(frontmatter);

      expect(hash).toBeDefined();
      expect(hash.length).toBe(64);
    });

    it('should produce consistent hashes for same data', () => {
      const frontmatter = {
        name: 'Test',
        version: '1.0.0',
      };

      const hash1 = calculateFrontmatterHash(frontmatter);
      const hash2 = calculateFrontmatterHash(frontmatter);

      expect(hash1).toBe(hash2);
    });
  });

  describe('calculateCombinedHash', () => {
    it('should calculate combined hash', () => {
      const frontmatter = { name: 'Test' };
      const content = 'test content';

      const hash = calculateCombinedHash(frontmatter, content);

      expect(hash).toBeDefined();
      expect(hash.length).toBe(64);
    });
  });
});

describe('Webhook Utilities', () => {
  describe('verifyGitHubWebhookSignature', () => {
    it('should verify valid signature', () => {
      const payload = 'test payload';
      const secret = 'test-secret';

      // Calculate expected signature
      const hmac = createHmac('sha256', secret);
      hmac.update(payload);
      const expectedSignature = 'sha256=' + hmac.digest('hex');

      const result = verifyGitHubWebhookSignature(payload, expectedSignature, secret);

      expect(result).toBe(true);
    });

    it('should reject invalid signature', () => {
      const payload = 'test payload';
      const secret = 'test-secret';
      const invalidSignature = 'sha256=' + 'a'.repeat(64);

      const result = verifyGitHubWebhookSignature(payload, invalidSignature, secret);

      expect(result).toBe(false);
    });

    it('should reject signature without sha256 prefix', () => {
      const payload = 'test payload';
      const secret = 'test-secret';
      const invalidSignature = 'a'.repeat(64);

      const result = verifyGitHubWebhookSignature(payload, invalidSignature, secret);

      expect(result).toBe(false);
    });
  });

  describe('extractFileChanges', () => {
    it('should extract file changes from payload', () => {
      const payload: GitHubWebhookPayload = {
        commits: [
          {
            id: 'abc123',
            message: 'Update files',
            author: { name: 'Test', email: 'test@example.com' },
            added: ['file1.md', 'file2.md'],
            modified: ['file3.md'],
            removed: ['file4.md'],
          },
        ],
      };

      const changes = extractFileChanges(payload);

      expect(changes.added).toContain('file1.md');
      expect(changes.added).toContain('file2.md');
      expect(changes.modified).toContain('file3.md');
      expect(changes.removed).toContain('file4.md');
    });

    it('should remove duplicates', () => {
      const payload: GitHubWebhookPayload = {
        commits: [
          {
            id: 'abc123',
            message: 'Update',
            author: { name: 'Test', email: 'test@example.com' },
            added: ['file1.md', 'file1.md'],
            modified: [],
            removed: [],
          },
        ],
      };

      const changes = extractFileChanges(payload);

      expect(changes.added.length).toBe(1);
      expect(changes.added[0]).toBe('file1.md');
    });
  });

  describe('isPushEvent', () => {
    it('should identify push events', () => {
      const payload: GitHubWebhookPayload = {
        commits: [
          {
            id: 'abc123',
            message: 'Push',
            author: { name: 'Test', email: 'test@example.com' },
            added: [],
            modified: [],
            removed: [],
          },
        ],
      };

      expect(isPushEvent(payload)).toBe(true);
    });

    it('should reject non-push events', () => {
      const payload: GitHubWebhookPayload = {};

      expect(isPushEvent(payload)).toBe(false);
    });
  });

  describe('getBranchName', () => {
    it('should extract branch name from ref', () => {
      const payload: GitHubWebhookPayload = {
        ref: 'refs/heads/main',
      };

      expect(getBranchName(payload)).toBe('main');
    });

    it('should handle feature branches', () => {
      const payload: GitHubWebhookPayload = {
        ref: 'refs/heads/feature/new-feature',
      };

      expect(getBranchName(payload)).toBe('new-feature');
    });

    it('should return null for missing ref', () => {
      const payload: GitHubWebhookPayload = {};

      expect(getBranchName(payload)).toBeNull();
    });
  });
});

