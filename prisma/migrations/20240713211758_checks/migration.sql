/*
  Warnings:

  - You are about to drop the `GithubResponses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GithubResponses" DROP CONSTRAINT "GithubResponses_repositoryId_fkey";

-- DropTable
DROP TABLE "GithubResponses";

-- CreateTable
CREATE TABLE "GithubResponse" (
    "id" TEXT NOT NULL,
    "repo" JSONB NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Check" (
    "id" TEXT NOT NULL,
    "red" INTEGER NOT NULL,
    "amber" INTEGER NOT NULL,
    "green" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Check_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GithubResponse" ADD CONSTRAINT "GithubResponse_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
