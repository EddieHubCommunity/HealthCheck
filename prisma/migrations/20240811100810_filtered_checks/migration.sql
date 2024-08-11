/*
  Warnings:

  - Added the required column `allData` to the `Check` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Check" ADD COLUMN     "allData" JSONB NOT NULL,
ADD COLUMN     "ignoreChecks" TEXT[];
