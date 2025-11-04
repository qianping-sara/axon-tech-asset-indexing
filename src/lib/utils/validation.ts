/**
 * Validation utilities for API requests
 */

import { Category, Status } from '@prisma/client';

/**
 * Validate asset creation/update data
 */
export interface AssetValidationData {
  name?: string;
  description?: string;
  category?: string;
  assetType?: string;
  version?: string;
  status?: string;
  owner?: string;
  contentPath?: string;
  contentHash?: string;
  sourceSystem?: string;
  sourceLink?: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate required fields
 */
export function validateRequiredFields(
  data: Record<string, unknown>,
  required: string[]
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const field of required) {
    if (!data[field]) {
      errors[field] = `${field} is required`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate asset name
 */
export function validateAssetName(name: string): string | null {
  if (!name || typeof name !== 'string') {
    return 'Name must be a non-empty string';
  }
  if (name.length < 3) {
    return 'Name must be at least 3 characters long';
  }
  if (name.length > 255) {
    return 'Name must not exceed 255 characters';
  }
  return null;
}

/**
 * Validate asset description
 */
export function validateAssetDescription(description: string): string | null {
  if (!description || typeof description !== 'string') {
    return 'Description must be a non-empty string';
  }
  if (description.length < 10) {
    return 'Description must be at least 10 characters long';
  }
  if (description.length > 5000) {
    return 'Description must not exceed 5000 characters';
  }
  return null;
}

/**
 * Validate category
 */
export function validateCategory(category: string): string | null {
  const validCategories = Object.values(Category);
  if (!validCategories.includes(category as Category)) {
    return `Category must be one of: ${validCategories.join(', ')}`;
  }
  return null;
}

/**
 * Validate status
 */
export function validateStatus(status: string): string | null {
  const validStatuses = Object.values(Status);
  if (!validStatuses.includes(status as Status)) {
    return `Status must be one of: ${validStatuses.join(', ')}`;
  }
  return null;
}

/**
 * Validate version string
 */
export function validateVersion(version: string): string | null {
  if (!version || typeof version !== 'string') {
    return 'Version must be a non-empty string';
  }
  if (version.length > 50) {
    return 'Version must not exceed 50 characters';
  }
  // Basic semver-like validation
  if (!/^\d+\.\d+\.\d+/.test(version)) {
    return 'Version should follow semantic versioning (e.g., 1.0.0)';
  }
  return null;
}

/**
 * Validate email
 */
export function validateEmail(email: string): string | null {
  if (!email || typeof email !== 'string') {
    return 'Email must be a non-empty string';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  return null;
}

/**
 * Validate URL
 */
export function validateUrl(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return 'URL must be a non-empty string';
  }
  try {
    new URL(url);
    return null;
  } catch {
    return 'Invalid URL format';
  }
}

/**
 * Validate asset type
 */
export function validateAssetType(assetType: string): string | null {
  if (!assetType || typeof assetType !== 'string') {
    return 'Asset type must be a non-empty string';
  }
  if (assetType.length > 100) {
    return 'Asset type must not exceed 100 characters';
  }
  return null;
}

/**
 * Validate content path
 */
export function validateContentPath(contentPath: string): string | null {
  if (!contentPath || typeof contentPath !== 'string') {
    return 'Content path must be a non-empty string';
  }
  if (contentPath.length > 500) {
    return 'Content path must not exceed 500 characters';
  }
  if (!contentPath.startsWith('assets/')) {
    return 'Content path must start with "assets/"';
  }
  return null;
}

/**
 * Validate content hash (SHA256)
 */
export function validateContentHash(hash: string): string | null {
  if (!hash || typeof hash !== 'string') {
    return 'Content hash must be a non-empty string';
  }
  if (!/^[a-f0-9]{64}$/.test(hash)) {
    return 'Content hash must be a valid SHA256 hash (64 hex characters)';
  }
  return null;
}

/**
 * Validate complete asset data for creation
 */
export function validateAssetCreation(data: AssetValidationData): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate required fields
  const requiredFields = ['name', 'description', 'category', 'assetType', 'version', 'status', 'owner', 'contentPath', 'contentHash', 'sourceSystem', 'sourceLink'];
  const requiredResult = validateRequiredFields(data as Record<string, unknown>, requiredFields);
  if (!requiredResult.valid) {
    Object.assign(errors, requiredResult.errors);
  }

  // Validate individual fields
  if (data.name) {
    const nameError = validateAssetName(data.name);
    if (nameError) errors.name = nameError;
  }

  if (data.description) {
    const descError = validateAssetDescription(data.description);
    if (descError) errors.description = descError;
  }

  if (data.category) {
    const categoryError = validateCategory(data.category);
    if (categoryError) errors.category = categoryError;
  }

  if (data.status) {
    const statusError = validateStatus(data.status);
    if (statusError) errors.status = statusError;
  }

  if (data.version) {
    const versionError = validateVersion(data.version);
    if (versionError) errors.version = versionError;
  }

  if (data.owner) {
    const ownerError = validateEmail(data.owner);
    if (ownerError) errors.owner = ownerError;
  }

  if (data.assetType) {
    const typeError = validateAssetType(data.assetType);
    if (typeError) errors.assetType = typeError;
  }

  if (data.contentPath) {
    const pathError = validateContentPath(data.contentPath);
    if (pathError) errors.contentPath = pathError;
  }

  if (data.contentHash) {
    const hashError = validateContentHash(data.contentHash);
    if (hashError) errors.contentHash = hashError;
  }

  if (data.sourceSystem) {
    if (typeof data.sourceSystem !== 'string' || data.sourceSystem.length > 100) {
      errors.sourceSystem = 'Source system must be a string not exceeding 100 characters';
    }
  }

  if (data.sourceLink) {
    const linkError = validateUrl(data.sourceLink);
    if (linkError) errors.sourceLink = linkError;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate asset update data (all fields optional)
 */
export function validateAssetUpdate(data: AssetValidationData): ValidationResult {
  const errors: Record<string, string> = {};

  if (data.name) {
    const nameError = validateAssetName(data.name);
    if (nameError) errors.name = nameError;
  }

  if (data.description) {
    const descError = validateAssetDescription(data.description);
    if (descError) errors.description = descError;
  }

  if (data.category) {
    const categoryError = validateCategory(data.category);
    if (categoryError) errors.category = categoryError;
  }

  if (data.status) {
    const statusError = validateStatus(data.status);
    if (statusError) errors.status = statusError;
  }

  if (data.version) {
    const versionError = validateVersion(data.version);
    if (versionError) errors.version = versionError;
  }

  if (data.owner) {
    const ownerError = validateEmail(data.owner);
    if (ownerError) errors.owner = ownerError;
  }

  if (data.assetType) {
    const typeError = validateAssetType(data.assetType);
    if (typeError) errors.assetType = typeError;
  }

  if (data.contentPath) {
    const pathError = validateContentPath(data.contentPath);
    if (pathError) errors.contentPath = pathError;
  }

  if (data.contentHash) {
    const hashError = validateContentHash(data.contentHash);
    if (hashError) errors.contentHash = hashError;
  }

  if (data.sourceSystem) {
    if (typeof data.sourceSystem !== 'string' || data.sourceSystem.length > 100) {
      errors.sourceSystem = 'Source system must be a string not exceeding 100 characters';
    }
  }

  if (data.sourceLink) {
    const linkError = validateUrl(data.sourceLink);
    if (linkError) errors.sourceLink = linkError;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

