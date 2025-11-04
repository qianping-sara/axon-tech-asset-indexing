/**
 * Markdown file parser with Frontmatter extraction
 */

import matter from 'gray-matter';

export interface ParsedMarkdown {
  frontmatter: Record<string, unknown>;
  content: string;
  excerpt?: string;
}

export interface AssetFrontmatter {
  name: string;
  description: string;
  category: string;
  assetType: string;
  version: string;
  status: string;
  owner: string;
  tags?: string[];
  [key: string]: unknown;
}

/**
 * Parse Markdown file with Frontmatter
 */
export function parseMarkdown(fileContent: string): ParsedMarkdown {
  const { data, content, excerpt } = matter(fileContent, {
    excerpt: true,
    excerpt_separator: '---',
  });

  return {
    frontmatter: data,
    content: content.trim(),
    excerpt: excerpt?.trim(),
  };
}

/**
 * Extract asset metadata from Frontmatter
 */
export function extractAssetMetadata(frontmatter: Record<string, unknown>): AssetFrontmatter {
  return {
    name: String(frontmatter.name || ''),
    description: String(frontmatter.description || ''),
    category: String(frontmatter.category || ''),
    assetType: String(frontmatter.assetType || ''),
    version: String(frontmatter.version || ''),
    status: String(frontmatter.status || 'DRAFT'),
    owner: String(frontmatter.owner || ''),
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
  };
}

/**
 * Validate asset metadata
 */
export function validateAssetMetadata(metadata: AssetFrontmatter): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!metadata.name || metadata.name.trim().length === 0) {
    errors.push('name is required');
  }

  if (!metadata.description || metadata.description.trim().length === 0) {
    errors.push('description is required');
  }

  if (!metadata.category || metadata.category.trim().length === 0) {
    errors.push('category is required');
  }

  if (!metadata.assetType || metadata.assetType.trim().length === 0) {
    errors.push('assetType is required');
  }

  if (!metadata.version || metadata.version.trim().length === 0) {
    errors.push('version is required');
  }

  if (!metadata.owner || metadata.owner.trim().length === 0) {
    errors.push('owner is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Parse Markdown file and extract asset data
 */
export function parseAssetMarkdown(fileContent: string): {
  metadata: AssetFrontmatter;
  content: string;
  valid: boolean;
  errors: string[];
} {
  const parsed = parseMarkdown(fileContent);
  const metadata = extractAssetMetadata(parsed.frontmatter);
  const validation = validateAssetMetadata(metadata);

  return {
    metadata,
    content: parsed.content,
    valid: validation.valid,
    errors: validation.errors,
  };
}

/**
 * Extract file path from GitHub webhook
 * Converts: assets/code/scripts/my-script.md -> assets/code/scripts/my-script.md
 */
export function extractFilePath(path: string): string {
  return path.trim();
}

/**
 * Check if file is a Markdown asset file
 */
export function isAssetMarkdownFile(filePath: string): boolean {
  // Must be in assets/ directory and be a .md file
  return filePath.startsWith('assets/') && filePath.endsWith('.md');
}

/**
 * Extract asset category from file path
 * Example: assets/code/scripts/my-script.md -> code
 */
export function extractCategoryFromPath(filePath: string): string | null {
  const parts = filePath.split('/');
  if (parts.length >= 2 && parts[0] === 'assets') {
    return parts[1];
  }
  return null;
}

/**
 * Extract asset name from file path
 * Example: assets/code/scripts/my-script.md -> my-script
 */
export function extractAssetNameFromPath(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';
  return fileName.replace(/\.md$/, '');
}

