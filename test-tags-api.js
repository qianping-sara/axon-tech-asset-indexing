const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getTags(query) {
  const page = Math.max(1, query.page || 1);
  const limit = Math.min(100, Math.max(1, query.limit || 20));
  const skip = (page - 1) * limit;

  const whereConditions = [];

  if (query.category) {
    whereConditions.push({ category: query.category });
  }

  if (query.search) {
    whereConditions.push({
      OR: [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ],
    });
  }

  const where = whereConditions.length > 0 ? { AND: whereConditions } : {};

  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder || 'desc';

  const [tags, total] = await Promise.all([
    prisma.tag.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { assets: true },
        },
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    prisma.tag.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: tags.map((tag) => ({
      ...tag,
      assetCount: tag._count.assets,
      _count: undefined,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
}

async function test() {
  try {
    console.log('Testing tags API with limit=10...\n');
    
    const result = await getTags({ limit: 10 });
    console.log('Success! Tags returned:');
    console.log(`Total tags: ${result.pagination.total}`);
    console.log(`Returned: ${result.data.length}`);
    console.log('\nFirst 3 tags:');
    result.data.slice(0, 3).forEach(tag => {
      console.log(`  - ${tag.name} (${tag.assetCount} assets)`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
