-- CreateTable
CREATE TABLE "axon_asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "assetType" VARCHAR(100) NOT NULL,
    "version" VARCHAR(50) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "owner" VARCHAR(255) NOT NULL,
    "contentPath" VARCHAR(500) NOT NULL,
    "contentHash" VARCHAR(64) NOT NULL,
    "sourceSystem" VARCHAR(100) NOT NULL,
    "sourceLink" VARCHAR(500) NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "publishedAt" DATETIME
);

-- CreateTable
CREATE TABLE "axon_tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL UNIQUE,
    "description" TEXT,
    "category" VARCHAR(100) NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "axon_asset_tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "axon_asset_tag_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "axon_asset" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "axon_asset_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "axon_tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "axon_asset_relation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fromAssetId" TEXT NOT NULL,
    "toAssetId" TEXT NOT NULL,
    "relationType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "axon_asset_relation_fromAssetId_fkey" FOREIGN KEY ("fromAssetId") REFERENCES "axon_asset" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "axon_asset_relation_toAssetId_fkey" FOREIGN KEY ("toAssetId") REFERENCES "axon_asset" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "axon_asset_version" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetId" TEXT NOT NULL,
    "version" VARCHAR(50) NOT NULL,
    "status" TEXT NOT NULL,
    "contentHash" VARCHAR(64) NOT NULL,
    "changeLog" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "axon_asset_version_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "axon_asset" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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

-- CreateIndex
CREATE INDEX "axon_tag_category_idx" ON "axon_tag"("category");

