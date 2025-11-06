/**
 * Script to scan and update asset bizDomain based on keywords
 * Usage: node scripts/update-biz-domain.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Keyword mapping to BizDomain
const KEYWORD_MAPPING = {
  // Core Servicing Domains (5)
  CLAIM: ['claim', 'fnol', 'loss', 'adjudication', 'payout', 'case investigation'],
  FINANCIAL_CHANGE: ['arrear', 'revival', 'reinstatement', 'refund', 'payment method', 'premium', 'financial'],
  INQUIRY_GENERAL_CHANGES: ['inquiry', 'information', 'contact', 'address', 'beneficiary', 'customer', 'policy info'],
  MONEY_OUT: ['withdrawal', 'divestment', 'annuity', 'maturity', 'loan', 'payout', 'value withdrawal'],
  WEALTH: ['investment', 'wealth', 'portfolio', 'asset allocation', 'fund switch', 'nav', 'ilp'],
  // Support Domain Capabilities (5)
  CUSTOMER_ENGAGEMENT: ['channel', 'experience', 'app', 'web', 'call center', 'authentication', 'sso', 'journey', 'communication', 'notification', 'template', 'dispatch', 'sms', 'email', 'letter'],
  CUSTOMER_RELATIONSHIP_MANAGEMENT: ['customer', 'crm', 'master data', 'mdm', 'profile', 'relationship', 'single view'],
  PAYMENT_SETTLEMENT: ['payment', 'settlement', 'gateway', 'direct debit', 'giro', 'receipt', 'transaction'],
  FINANCE_ACCOUNTING: ['finance', 'accounting', 'ledger', 'reconciliation', 'ar/ap', 'reporting', 'gl'],
  RISK_COMPLIANCE: ['risk', 'compliance', 'aml', 'kyc', 'regulatory', 'monitoring', 'audit'],
  // General Domain Capabilities (1)
  COMMON_CAPABILITIES: ['data', 'mdm', 'identity', 'access', 'sso', 'authentication', 'authorization', 'document', 'archive', 'storage', 'retrieval'],
};

/**
 * Detect bizDomain from asset name and description
 */
function detectBizDomain(name, description, tags) {
  const text = `${name} ${description} ${tags.join(' ')}`.toLowerCase();

  // Score each domain based on keyword matches
  const scores = {};

  for (const [domain, keywords] of Object.entries(KEYWORD_MAPPING)) {
    let score = 0;
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        score += keyword.length; // Longer keywords get higher weight
      }
    }
    if (score > 0) {
      scores[domain] = score;
    }
  }

  // Return domain with highest score
  if (Object.keys(scores).length === 0) {
    return null;
  }

  return Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0];
}

async function main() {
  console.log('🔍 Scanning assets and updating bizDomain...\n');

  try {
    // Get all assets without bizDomain
    const assets = await prisma.axon_asset.findMany({
      where: {
        bizDomain: null,
      },
      include: {
        axon_asset_tag: {
          include: {
            axon_tag: true,
          },
        },
      },
    });

    console.log(`📊 Found ${assets.length} assets without bizDomain\n`);

    if (assets.length === 0) {
      console.log('✅ All assets already have bizDomain assigned!');
      return;
    }

    let updated = 0;
    let skipped = 0;

    for (const asset of assets) {
      const tags = asset.axon_asset_tag.map((at) => at.axon_tag.name);
      const detectedDomain = detectBizDomain(asset.name, asset.description, tags);

      if (detectedDomain) {
        await prisma.axon_asset.update({
          where: { id: asset.id },
          data: { bizDomain: detectedDomain },
        });

        console.log(`✅ ${asset.name}`);
        console.log(`   → ${detectedDomain}`);
        console.log(`   Tags: ${tags.join(', ') || 'none'}\n`);
        updated++;
      } else {
        console.log(`⚠️  ${asset.name}`);
        console.log(`   → Could not determine bizDomain`);
        console.log(`   Tags: ${tags.join(', ') || 'none'}\n`);
        skipped++;
      }
    }

    console.log('\n📈 Summary:');
    console.log(`✅ Updated: ${updated}`);
    console.log(`⚠️  Skipped: ${skipped}`);
    console.log(`📊 Total: ${assets.length}`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

