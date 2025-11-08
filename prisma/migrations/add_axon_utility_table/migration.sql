-- CreateTable axon_utility
CREATE TABLE "axon_utility" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "icon" VARCHAR(100) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "version" VARCHAR(50) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "owner" VARCHAR(255),
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "axon_utility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "axon_utility_category_idx" ON "axon_utility"("category");

-- CreateIndex
CREATE INDEX "axon_utility_status_idx" ON "axon_utility"("status");

-- CreateIndex
CREATE INDEX "axon_utility_owner_idx" ON "axon_utility"("owner");

