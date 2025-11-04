/**
 * Hash utilities for content integrity verification
 */

import { createHash } from 'crypto';

/**
 * Calculate SHA256 hash of content
 */
export function calculateSHA256(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

/**
 * Calculate SHA256 hash of file content
 * Normalizes line endings to LF for consistent hashing
 */
export function calculateFileHash(fileContent: string): string {
  // Normalize line endings to LF
  const normalized = fileContent.replace(/\r\n/g, '\n').trim();
  return calculateSHA256(normalized);
}

/**
 * Verify content hash
 */
export function verifyHash(content: string, expectedHash: string): boolean {
  const calculatedHash = calculateFileHash(content);
  return calculatedHash === expectedHash;
}

/**
 * Calculate hash of Markdown frontmatter
 */
export function calculateFrontmatterHash(frontmatter: Record<string, unknown>): string {
  const json = JSON.stringify(frontmatter, Object.keys(frontmatter).sort());
  return calculateSHA256(json);
}

/**
 * Calculate combined hash of frontmatter and content
 */
export function calculateCombinedHash(
  frontmatter: Record<string, unknown>,
  content: string
): string {
  const frontmatterHash = calculateFrontmatterHash(frontmatter);
  const contentHash = calculateFileHash(content);
  return calculateSHA256(frontmatterHash + contentHash);
}

