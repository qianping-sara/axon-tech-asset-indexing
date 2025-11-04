/**
 * Unit tests for Markdown parser
 * 
 * Run with: npm test -- tests/unit/markdown-parser.test.ts
 */

import { describe, it, expect } from '@jest/globals';
import {
  parseMarkdown,
  extractAssetMetadata,
  validateAssetMetadata,
  parseAssetMarkdown,
  isAssetMarkdownFile,
  extractCategoryFromPath,
  extractAssetNameFromPath,
} from '@/lib/markdown/parser';

describe('Markdown Parser', () => {
  const sampleMarkdown = `---
name: "Test Asset"
description: "This is a test asset for unit testing"
category: "CODE_COMPONENTS"
assetType: "Script"
version: "1.0.0"
status: "PUBLISHED"
owner: "test@example.com"
tags:
  - python
  - testing
---

# Test Asset

This is the detailed content of the test asset.

## Features

- Feature 1
- Feature 2
`;

  describe('parseMarkdown', () => {
    it('should parse Markdown with Frontmatter', () => {
      const result = parseMarkdown(sampleMarkdown);

      expect(result.frontmatter).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.frontmatter.name).toBe('Test Asset');
    });

    it('should extract content without Frontmatter', () => {
      const result = parseMarkdown(sampleMarkdown);

      expect(result.content).toContain('# Test Asset');
      expect(result.content).not.toContain('---');
    });

    it('should handle Markdown without Frontmatter', () => {
      const markdown = '# Just Content\n\nNo frontmatter here.';
      const result = parseMarkdown(markdown);

      expect(result.frontmatter).toEqual({});
      expect(result.content).toContain('# Just Content');
    });
  });

  describe('extractAssetMetadata', () => {
    it('should extract all required fields', () => {
      const frontmatter = {
        name: 'Test Asset',
        description: 'Test description',
        category: 'CODE_COMPONENTS',
        assetType: 'Script',
        version: '1.0.0',
        status: 'PUBLISHED',
        owner: 'test@example.com',
        tags: ['python', 'testing'],
      };

      const metadata = extractAssetMetadata(frontmatter);

      expect(metadata.name).toBe('Test Asset');
      expect(metadata.description).toBe('Test description');
      expect(metadata.category).toBe('CODE_COMPONENTS');
      expect(metadata.tags).toEqual(['python', 'testing']);
    });

    it('should handle missing optional fields', () => {
      const frontmatter = {
        name: 'Test Asset',
        description: 'Test description',
        category: 'CODE_COMPONENTS',
        assetType: 'Script',
        version: '1.0.0',
        status: 'PUBLISHED',
        owner: 'test@example.com',
      };

      const metadata = extractAssetMetadata(frontmatter);

      expect(metadata.tags).toEqual([]);
    });
  });

  describe('validateAssetMetadata', () => {
    it('should validate correct metadata', () => {
      const metadata = {
        name: 'Test Asset',
        description: 'Test description',
        category: 'CODE_COMPONENTS',
        assetType: 'Script',
        version: '1.0.0',
        status: 'PUBLISHED',
        owner: 'test@example.com',
        tags: [],
      };

      const result = validateAssetMetadata(metadata);

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should detect missing required fields', () => {
      const metadata = {
        name: '',
        description: '',
        category: '',
        assetType: '',
        version: '',
        status: 'PUBLISHED',
        owner: '',
        tags: [],
      };

      const result = validateAssetMetadata(metadata);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('parseAssetMarkdown', () => {
    it('should parse valid asset Markdown', () => {
      const result = parseAssetMarkdown(sampleMarkdown);

      expect(result.valid).toBe(true);
      expect(result.metadata.name).toBe('Test Asset');
      expect(result.content).toContain('# Test Asset');
      expect(result.errors).toEqual([]);
    });

    it('should detect invalid asset Markdown', () => {
      const invalidMarkdown = `---
name: ""
description: ""
---

Content here`;

      const result = parseAssetMarkdown(invalidMarkdown);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('isAssetMarkdownFile', () => {
    it('should identify asset Markdown files', () => {
      expect(isAssetMarkdownFile('assets/code/scripts/test.md')).toBe(true);
      expect(isAssetMarkdownFile('assets/api/rest-api.md')).toBe(true);
      expect(isAssetMarkdownFile('assets/data/dataset.md')).toBe(true);
    });

    it('should reject non-asset files', () => {
      expect(isAssetMarkdownFile('docs/readme.md')).toBe(false);
      expect(isAssetMarkdownFile('assets/test.txt')).toBe(false);
      expect(isAssetMarkdownFile('test.md')).toBe(false);
    });
  });

  describe('extractCategoryFromPath', () => {
    it('should extract category from file path', () => {
      expect(extractCategoryFromPath('assets/code/scripts/test.md')).toBe('code');
      expect(extractCategoryFromPath('assets/api/rest.md')).toBe('api');
      expect(extractCategoryFromPath('assets/data/dataset.md')).toBe('data');
    });

    it('should return null for invalid paths', () => {
      expect(extractCategoryFromPath('docs/readme.md')).toBeNull();
      expect(extractCategoryFromPath('test.md')).toBeNull();
    });
  });

  describe('extractAssetNameFromPath', () => {
    it('should extract asset name from file path', () => {
      expect(extractAssetNameFromPath('assets/code/scripts/my-script.md')).toBe('my-script');
      expect(extractAssetNameFromPath('assets/api/rest-api.md')).toBe('rest-api');
      expect(extractAssetNameFromPath('assets/data/dataset.md')).toBe('dataset');
    });

    it('should handle nested paths', () => {
      expect(extractAssetNameFromPath('assets/code/scripts/utils/helper.md')).toBe('helper');
    });
  });
});

