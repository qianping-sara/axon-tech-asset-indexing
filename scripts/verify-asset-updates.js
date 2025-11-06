/**
 * Verify Asset Updates Script
 * Checks if the two assets have been updated with correct hashes and metadata
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔍 Verifying asset updates...\n');

    const assets = await prisma.axon_asset.findMany({
      where: {
        id: {
          in: [
            'asset-generic-tool-selection-guide-001',
            'asset-coe-governance-charter-001'
          ]
        }
      }
    });

    if (assets.length === 0) {
      console.error('❌ No assets found!');
      process.exit(1);
    }

    console.log('📊 Asset Update Status:\n');

    for (const asset of assets) {
      console.log(`📄 ${asset.name}`);
      console.log(`   ID: ${asset.id}`);
      console.log(`   Content Hash: ${asset.contentHash}`);
      console.log(`   Source System: ${asset.sourceSystem}`);
      console.log(`   Source Link: ${asset.sourceLink}`);
      console.log(`   Updated At: ${asset.updatedAt}`);
      console.log('');
    }

    // Verify specific hashes
    const genericToolGuide = assets.find(a => a.id === 'asset-generic-tool-selection-guide-001');
    const coeGovernance = assets.find(a => a.id === 'asset-coe-governance-charter-001');

    console.log('✅ Verification Results:\n');

    if (genericToolGuide?.contentHash === '2399ad476c1f4580ea76ec52d4ec56cbdabb1e0e898b6642c8f1fca9aa0e11b0') {
      console.log('✓ Generic Tool Selection Guide hash is correct');
    } else {
      console.log('✗ Generic Tool Selection Guide hash is INCORRECT');
    }

    if (coeGovernance?.contentHash === 'e39e83ba2b1a6c2ebaaffbc1357c84da61a6a2c208efcee770fadbc7b9341063') {
      console.log('✓ CoE Governance Charter hash is correct');
    } else {
      console.log('✗ CoE Governance Charter hash is INCORRECT');
    }

    if (genericToolGuide?.sourceSystem === 'Axon' && coeGovernance?.sourceSystem === 'Axon') {
      console.log('✓ Both assets have sourceSystem set to "Axon"');
    } else {
      console.log('✗ sourceSystem is not correctly set');
    }

    if (genericToolGuide?.sourceLink.includes('axon-tech-asset-indexing.vercel.app') &&
        coeGovernance?.sourceLink.includes('axon-tech-asset-indexing.vercel.app')) {
      console.log('✓ Both assets have correct sourceLink');
    } else {
      console.log('✗ sourceLink is not correctly set');
    }

    console.log('\n✅ Verification complete!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

