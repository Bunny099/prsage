-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL,
    "prId" BIGINT NOT NULL,
    "reviews" TEXT NOT NULL,
    "patchFiles" TEXT NOT NULL,
    "iteration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);
