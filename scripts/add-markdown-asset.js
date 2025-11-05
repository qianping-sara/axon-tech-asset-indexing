/**
 * 添加示例 Markdown 资产到数据库
 * 用于测试 Markdown 渲染功能
 */

const { PrismaClient } = require('@prisma/client');
const { randomUUID } = require('crypto');

const prisma = new PrismaClient();

async function main() {
  try {
    // 检查是否已存在
    const existing = await prisma.axon_asset.findFirst({
      where: {
        name: 'Policy API',
      },
    });

    if (existing) {
      console.log('✓ Asset already exists:', existing.id);
      return;
    }

    // 创建新资产
    const asset = await prisma.axon_asset.create({
      data: {
        id: randomUUID(),
        name: 'Policy API',
        description: 'Comprehensive API for policy management and retrieval',
        category: 'SERVICES_APIS',
        assetType: 'REST APIs',
        version: '2.1',
        status: 'PUBLISHED',
        owner: 'Servicing Team',
        contentPath: 'app/assets/services/rest-apis/policy-api.md',
        contentHash: 'c7a3922c9e7811fd0fef4c91c79666ed33d89ebed922fbb0850dd4014a893470',
        sourceSystem: 'GitHub',
        sourceLink: 'https://github.com/example/policy-api',
        updatedAt: new Date(),
      },
    });

    console.log('✓ Asset created successfully:', asset.id);
    console.log('  Name:', asset.name);
    console.log('  ContentPath:', asset.contentPath);
    console.log('  Category:', asset.category);
    console.log('  AssetType:', asset.assetType);
  } catch (error) {
    console.error('✗ Error creating asset:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

