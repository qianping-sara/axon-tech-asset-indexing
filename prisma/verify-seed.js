const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Verifying seeded data...\n');

  try {
    // 1. Count tags
    const tagCount = await prisma.tag.count();
    console.log(`📝 Tags: ${tagCount}`);

    // 2. Count assets
    const assetCount = await prisma.asset.count();
    console.log(`📦 Assets: ${assetCount}`);

    // 3. Count asset-tag links
    const assetTagCount = await prisma.assetTag.count();
    console.log(`🔗 Asset-Tag Links: ${assetTagCount}`);

    // 4. Get assets by category
    const assetsByCategory = await prisma.asset.groupBy({
      by: ['category'],
      _count: true,
    });
    console.log('\n📊 Assets by Category:');
    assetsByCategory.forEach((group) => {
      console.log(`  - ${group.category}: ${group._count}`);
    });

    // 5. Get assets by type
    const assetsByType = await prisma.asset.groupBy({
      by: ['assetType'],
      _count: true,
    });
    console.log('\n📊 Assets by Type:');
    assetsByType.forEach((group) => {
      console.log(`  - ${group.assetType}: ${group._count}`);
    });

    // 6. Sample assets with tags
    console.log('\n📋 Sample Assets with Tags:');
    const sampleAssets = await prisma.asset.findMany({
      take: 5,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    sampleAssets.forEach((asset) => {
      console.log(`\n  ${asset.name}`);
      console.log(`  Category: ${asset.category}`);
      console.log(`  Type: ${asset.assetType}`);
      console.log(`  Tags: ${asset.tags.map((t) => t.tag.name).join(', ')}`);
    });

    // 7. Search test
    console.log('\n🔎 Search Test - "Policy":');
    const searchResults = await prisma.asset.findMany({
      where: {
        OR: [
          { name: { contains: 'Policy', mode: 'insensitive' } },
          { description: { contains: 'Policy', mode: 'insensitive' } },
        ],
      },
      take: 3,
    });
    searchResults.forEach((asset) => {
      console.log(`  - ${asset.name}`);
    });

    console.log('\n✅ Verification completed successfully!');
  } catch (error) {
    console.error('❌ Verification failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

