/**
 * Script to manually update specific assets with bizDomain
 * Usage: node scripts/update-biz-domain-manual.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Manual mapping for assets that couldn't be auto-detected
const MANUAL_UPDATES = [
  { name: 'Retirals API', bizDomain: 'MONEY_OUT' },
  { name: 'Servicing Security API', bizDomain: 'RISK_COMPLIANCE' },
  { name: 'Policy API (Legacy)', bizDomain: 'INQUIRY_GENERAL_CHANGES' },
  { name: 'Policy API (Two-Pot)', bizDomain: 'MONEY_OUT' },
  { name: 'Reference Data Service', bizDomain: 'INQUIRY_GENERAL_CHANGES' },
  { name: 'Tax API', bizDomain: 'FINANCE_ACCOUNTING' },
  { name: 'Adviser API', bizDomain: 'INQUIRY_GENERAL_CHANGES' },
  { name: 'Banking API (AVSR)', bizDomain: 'RISK_COMPLIANCE' },
  { name: 'Banking API (Check Digit)', bizDomain: 'RISK_COMPLIANCE' },
  { name: 'Banking API (Update)', bizDomain: 'INQUIRY_GENERAL_CHANGES' },
  { name: 'Calculation API (Two-Pot)', bizDomain: 'MONEY_OUT' },
  { name: 'Calculation API', bizDomain: 'FINANCE_ACCOUNTING' },
];

async function main() {
  console.log('🔧 Manually updating assets with bizDomain...\n');

  try {
    let updated = 0;
    let notFound = 0;

    for (const { name, bizDomain } of MANUAL_UPDATES) {
      const asset = await prisma.axon_asset.findFirst({
        where: { name },
      });

      if (asset) {
        await prisma.axon_asset.update({
          where: { id: asset.id },
          data: { bizDomain },
        });

        console.log(`✅ ${name}`);
        console.log(`   → ${bizDomain}\n`);
        updated++;
      } else {
        console.log(`❌ ${name} - NOT FOUND\n`);
        notFound++;
      }
    }

    console.log('\n📈 Summary:');
    console.log(`✅ Updated: ${updated}`);
    console.log(`❌ Not Found: ${notFound}`);
    console.log(`📊 Total: ${MANUAL_UPDATES.length}`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

