/**
 * Asset synchronization business logic
 * Handles syncing Markdown files from GitHub to database
 */

import { prisma } from '@/lib/db/client';
import { parseAssetMarkdown, isAssetMarkdownFile } from '@/lib/markdown/parser';
import { calculateFileHash } from '@/lib/utils/hash';
import { GitHubWebhookPayload, extractFileChanges } from '@/lib/utils/webhook';
import { Category, Status } from '@prisma/client';

export interface SyncResult {
  success: boolean;
  message: string;
  stats: {
    processed: number;
    created: number;
    updated: number;
    deleted: number;
    failed: number;
  };
  errors: Array<{
    file: string;
    error: string;
  }>;
}

/**
 * Process GitHub webhook and sync assets
 */
export async function syncAssetsFromWebhook(
  payload: GitHubWebhookPayload,
  fileContents: Record<string, string>
): Promise<SyncResult> {
  const stats = {
    processed: 0,
    created: 0,
    updated: 0,
    deleted: 0,
    failed: 0,
  };
  const errors: Array<{ file: string; error: string }> = [];

  try {
    const changes = extractFileChanges(payload);

    // Process added and modified files
    const filesToProcess = [...new Set([...changes.added, ...changes.modified])];

    for (const filePath of filesToProcess) {
      if (!isAssetMarkdownFile(filePath)) {
        continue;
      }

      stats.processed++;

      try {
        const fileContent = fileContents[filePath];
        if (!fileContent) {
          errors.push({
            file: filePath,
            error: 'File content not provided',
          });
          stats.failed++;
          continue;
        }

        const result = await syncAssetFile(filePath, fileContent);
        if (result.created) {
          stats.created++;
        } else if (result.updated) {
          stats.updated++;
        }
      } catch (error) {
        stats.failed++;
        errors.push({
          file: filePath,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // Process deleted files
    for (const filePath of changes.removed) {
      if (!isAssetMarkdownFile(filePath)) {
        continue;
      }

      stats.processed++;

      try {
        await deleteAssetByPath(filePath);
        stats.deleted++;
      } catch (error) {
        stats.failed++;
        errors.push({
          file: filePath,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return {
      success: stats.failed === 0,
      message: `Synced ${stats.processed} files: ${stats.created} created, ${stats.updated} updated, ${stats.deleted} deleted`,
      stats,
      errors,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error during sync',
      stats,
      errors,
    };
  }
}

/**
 * Sync a single asset file
 */
export async function syncAssetFile(
  filePath: string,
  fileContent: string
): Promise<{ created: boolean; updated: boolean }> {
  const parsed = parseAssetMarkdown(fileContent);

  if (!parsed.valid) {
    throw new Error(`Invalid asset metadata: ${parsed.errors.join(', ')}`);
  }

  const contentHash = calculateFileHash(fileContent);
  const { metadata } = parsed;

  // Check if asset already exists
  const existingAsset = await prisma.axon_asset.findFirst({
    where: {
      contentPath: filePath,
    },
  });

  if (existingAsset) {
    // Check if content has changed
    if (existingAsset.contentHash === contentHash) {
      return { created: false, updated: false };
    }

    // Update existing asset
    await prisma.axon_asset.update({
      where: { id: existingAsset.id },
      data: {
        name: metadata.name,
        description: metadata.description,
        category: metadata.category as Category,
        assetType: metadata.assetType,
        version: metadata.version,
        status: (metadata.status as Status) || 'PUBLISHED',
        owner: metadata.owner,
        contentHash,
        updatedAt: new Date(),
      },
    });

    return { created: false, updated: true };
  }

  // Create new asset
  await prisma.axon_asset.create({
    data: {
      name: metadata.name,
      description: metadata.description,
      category: metadata.category as Category,
      assetType: metadata.assetType,
      version: metadata.version,
      status: (metadata.status as Status) || 'PUBLISHED',
      owner: metadata.owner,
      contentPath: filePath,
      contentHash,
      sourceSystem: 'GitHub',
      sourceLink: '', // Will be set from webhook context
    },
  });

  return { created: true, updated: false };
}

/**
 * Delete asset by file path
 */
export async function deleteAssetByPath(filePath: string): Promise<void> {
  const asset = await prisma.axon_asset.findFirst({
    where: { contentPath: filePath },
  });

  if (asset) {
    await prisma.axon_asset.delete({
      where: { id: asset.id },
    });
  }
}

/**
 * Get sync status
 */
export async function getSyncStatus() {
  const totalAssets = await prisma.axon_asset.count();
  const publishedAssets = await prisma.axon_asset.count({
    where: { status: 'PUBLISHED' },
  });
  const draftAssets = await prisma.axon_asset.count({
    where: { status: 'DRAFT' },
  });

  const lastAsset = await prisma.axon_asset.findFirst({
    orderBy: { updatedAt: 'desc' },
    select: { updatedAt: true },
  });

  return {
    totalAssets,
    publishedAssets,
    draftAssets,
    lastSyncTime: lastAsset?.updatedAt || null,
  };
}

