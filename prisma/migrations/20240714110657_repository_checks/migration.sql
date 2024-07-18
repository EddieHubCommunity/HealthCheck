/*
  Warnings:

  - Added the required column `healthchecks` to the `Check` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repo` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Check" ADD COLUMN     "healthchecks" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "repo" TEXT NOT NULL;
