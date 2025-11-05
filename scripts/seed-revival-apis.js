/**
 * Seed Script: Update Revival APIs content hashes in database
 *
 * This script calculates SHA256 hashes for the 3 Revival API markdown files
 * and updates them in the database.
 *
 * Usage:
 * node scripts/seed-revival-apis.js
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Calculate SHA256 hash for file content
function calculateFileHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return crypto.createHash('sha256').update(content).digest('hex');
}

// API asset definitions
const APIs = [
  {
    id: 'asset-bank-detail-check-001',
    name: 'Bank Detail Check API',
    contentPath: 'public/assets/services/rest-apis/bank-detail-check-api.md',
  },
  {
    id: 'asset-policy-basic-info-001',
    name: 'Policy Basic Info API',
    contentPath: 'public/assets/services/rest-apis/policy-basic-info-api.md',
  },
  {
    id: 'asset-revival-qualification-001',
    name: 'Revival Qualification Summary API',
    contentPath: 'public/assets/services/rest-apis/revival-qualification-api.md',
  },
];

async function main() {
  try {
    console.log('🚀 Starting to update Revival APIs content hashes...\n');

    for (const apiDef of APIs) {
      console.log(`📝 Processing: ${apiDef.name}`);

      // Check if file exists
      const filePath = path.join(process.cwd(), apiDef.contentPath);
      if (!fs.existsSync(filePath)) {
        console.error(`  ❌ File not found: ${apiDef.contentPath}`);
        continue;
      }

      // Calculate hash
      const contentHash = calculateFileHash(filePath);
      console.log(`  ✓ Content hash: ${contentHash}`);

      // Update asset with content hash
      const updated = await prisma.axon_asset.update({
        where: { id: apiDef.id },
        data: {
          contentHash: contentHash,
          updatedAt: new Date(),
        },
      });

      console.log(`  ✓ Asset updated: ${updated.id}\n`);
    }

    console.log('✅ All Revival APIs content hashes updated successfully!');
  } catch (error) {
    console.error('❌ Error updating Revival APIs:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

