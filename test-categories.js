const { PrismaClient } = require('@prisma/client');
const { Category } = require('@prisma/client');

const prisma = new PrismaClient();

async function test() {
  try {
    console.log('Testing category stats...\n');
    
    // Get all categories
    const categories = Object.values(Category);
    console.log('Categories:', categories);
    console.log('');
    
    // Get counts for each
    for (const cat of categories) {
      const count = await prisma.asset.count({ where: { category: cat } });
      console.log(`${cat}: ${count}`);
    }
    
    console.log('\n\nFull stats response:');
    const stats = await Promise.all(
      categories.map(async (category) => {
        const total = await prisma.asset.count({ where: { category } });
        return {
          name: category,
          assetCount: total,
          total,
        };
      })
    );
    console.log(JSON.stringify(stats, null, 2));
    
  } finally {
    await prisma.$disconnect();
  }
}

test();
