import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: 'python' },
      update: {},
      create: {
        name: 'python',
        category: 'technology',
        description: 'Python programming language',
      },
    }),
    prisma.tag.upsert({
      where: { name: 'data-processing' },
      update: {},
      create: {
        name: 'data-processing',
        category: 'domain',
        description: 'Data processing and ETL',
      },
    }),
    prisma.tag.upsert({
      where: { name: 'api' },
      update: {},
      create: {
        name: 'api',
        category: 'technology',
        description: 'API and web services',
      },
    }),
    prisma.tag.upsert({
      where: { name: 'react' },
      update: {},
      create: {
        name: 'react',
        category: 'technology',
        description: 'React framework',
      },
    }),
  ]);

  console.log(`✅ Created ${tags.length} tags`);

  // Create sample asset
  const asset = await prisma.asset.create({
    data: {
      name: 'Sample Data Processing Script',
      description: 'A sample script for data processing',
      category: 'CODE_COMPONENTS',
      assetType: 'Script',
      version: '1.0.0',
      status: 'PUBLISHED',
      owner: 'team@company.com',
      contentPath: 'assets/code/scripts/sample-script.md',
      contentHash: 'abc123def456',
      sourceSystem: 'GitHub',
      sourceLink: 'https://github.com/example/repo',
      tags: {
        create: [
          { tagId: tags[0].id },
          { tagId: tags[1].id },
        ],
      },
    },
  });

  console.log(`✅ Created sample asset: ${asset.name}`);
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

