/**
 * Script to migrate existing bizDomain values to new schema
 * Handles mapping of old domain names to new ones:
 * - CHANNEL_EXPERIENCE → CUSTOMER_ENGAGEMENT
 * - CUSTOMER_COMMUNICATION → CUSTOMER_ENGAGEMENT
 * - CUSTOMER_MANAGEMENT → CUSTOMER_RELATIONSHIP_MANAGEMENT
 * 
 * Usage: node scripts/migrate-biz-domain.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Mapping of old domain names to new ones
const DOMAIN_MAPPING = {
  CHANNEL_EXPERIENCE: 'CUSTOMER_ENGAGEMENT',
  CUSTOMER_COMMUNICATION: 'CUSTOMER_ENGAGEMENT',
  CUSTOMER_MANAGEMENT: 'CUSTOMER_RELATIONSHIP_MANAGEMENT',
};

async function main() {
  console.log('🔄 Migrating bizDomain values to new schema...\n');

  try {
    let migrated = 0;
    let skipped = 0;

    for (const [oldDomain, newDomain] of Object.entries(DOMAIN_MAPPING)) {
      // Find all assets with the old domain
      const assets = await prisma.axon_asset.findMany({
        where: { bizDomain: oldDomain },
      });

      if (assets.length === 0) {
        console.log(`⏭️  ${oldDomain} - No assets found\n`);
        continue;
      }

      // Update all assets to use the new domain
      const result = await prisma.axon_asset.updateMany({
        where: { bizDomain: oldDomain },
        data: { bizDomain: newDomain },
      });

      console.log(`✅ ${oldDomain} → ${newDomain}`);
      console.log(`   Updated: ${result.count} assets\n`);
      migrated += result.count;
    }

    console.log('\n📈 Summary:');
    console.log(`✅ Migrated: ${migrated} assets`);
    console.log(`⏭️  Skipped: ${skipped} assets`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

