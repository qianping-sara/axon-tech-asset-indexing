const { PrismaClient } = require('@prisma/client');
const { Category } = require('@prisma/client');

const prisma = new PrismaClient();

async function getCategoryStats() {
  const categories = Object.values(Category);
  console.log('All categories:', categories);

  const stats = await Promise.all(
    categories.map(async (category) => {
      const [total, published, draft, deprecated, archived] = await Promise.all([
        prisma.asset.count({ where: { category } }),
        prisma.asset.count({ where: { category, status: 'PUBLISHED' } }),
        prisma.asset.count({ where: { category, status: 'DRAFT' } }),
        prisma.asset.count({ where: { category, status: 'DEPRECATED' } }),
        prisma.asset.count({ where: { category, status: 'ARCHIVED' } }),
      ]);

      return {
        name: category,
        assetCount: total,
        total,
        published,
        draft,
        deprecated,
        archived,
      };
    })
  );

  return stats;
}

async function test() {
  try {
    const stats = await getCategoryStats();
    console.log('\nAPI Response:');
    console.log(JSON.stringify({ success: true, data: stats }, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

test();
