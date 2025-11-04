-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CODE_COMPONENTS', 'SERVICES_APIS', 'AUTOMATION_WORKFLOWS', 'DATA_ANALYTICS', 'ARCHITECTURE_GOVERNANCE', 'KNOWLEDGE_PRACTICES');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'PUBLISHED', 'DEPRECATED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "RelationType" AS ENUM ('DEPENDS_ON', 'USED_BY', 'RELATED_TO', 'EXTENDS', 'IMPLEMENTS', 'REFERENCES');

-- CreateTable
CREATE TABLE "axon_asset" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "assetType" VARCHAR(100) NOT NULL,
    "version" VARCHAR(50) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "owner" VARCHAR(255) NOT NULL,
    "contentPath" VARCHAR(500) NOT NULL,
    "contentHash" VARCHAR(64) NOT NULL,
    "sourceSystem" VARCHAR(100) NOT NULL,
    "sourceLink" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "axon_asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "axon_tag" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "axon_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "axon_asset_tag" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "axon_asset_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "axon_asset_relation" (
    "id" TEXT NOT NULL,
    "fromAssetId" TEXT NOT NULL,
    "toAssetId" TEXT NOT NULL,
    "relationType" "RelationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "axon_asset_relation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "axon_asset_version" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "version" VARCHAR(50) NOT NULL,
    "status" "Status" NOT NULL,
    "contentHash" VARCHAR(64) NOT NULL,
    "changeLog" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "axon_asset_version_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "axon_tag_name_key" ON "axon_tag"("name");

-- CreateIndex
CREATE INDEX "axon_tag_category_idx" ON "axon_tag"("category");

-- CreateIndex
CREATE UNIQUE INDEX "axon_asset_tag_assetId_tagId_key" ON "axon_asset_tag"("assetId", "tagId");

-- CreateIndex
CREATE INDEX "axon_asset_tag_assetId_idx" ON "axon_asset_tag"("assetId");

-- CreateIndex
CREATE INDEX "axon_asset_tag_tagId_idx" ON "axon_asset_tag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "axon_asset_relation_fromAssetId_toAssetId_relationType_key" ON "axon_asset_relation"("fromAssetId", "toAssetId", "relationType");

-- CreateIndex
CREATE INDEX "axon_asset_relation_fromAssetId_idx" ON "axon_asset_relation"("fromAssetId");

-- CreateIndex
CREATE INDEX "axon_asset_relation_toAssetId_idx" ON "axon_asset_relation"("toAssetId");

-- CreateIndex
CREATE INDEX "axon_asset_version_assetId_idx" ON "axon_asset_version"("assetId");

-- CreateIndex
CREATE INDEX "axon_asset_version_version_idx" ON "axon_asset_version"("version");

-- CreateIndex
CREATE INDEX "axon_asset_category_idx" ON "axon_asset"("category");

-- CreateIndex
CREATE INDEX "axon_asset_status_idx" ON "axon_asset"("status");

-- CreateIndex
CREATE INDEX "axon_asset_owner_idx" ON "axon_asset"("owner");

-- CreateIndex
CREATE INDEX "axon_asset_updatedAt_idx" ON "axon_asset"("updatedAt");

-- AddForeignKey
ALTER TABLE "axon_asset_tag" ADD CONSTRAINT "axon_asset_tag_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "axon_asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "axon_asset_tag" ADD CONSTRAINT "axon_asset_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "axon_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "axon_asset_relation" ADD CONSTRAINT "axon_asset_relation_fromAssetId_fkey" FOREIGN KEY ("fromAssetId") REFERENCES "axon_asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "axon_asset_relation" ADD CONSTRAINT "axon_asset_relation_toAssetId_fkey" FOREIGN KEY ("toAssetId") REFERENCES "axon_asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "axon_asset_version" ADD CONSTRAINT "axon_asset_version_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "axon_asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
