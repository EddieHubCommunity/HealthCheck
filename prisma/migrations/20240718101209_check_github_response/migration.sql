/*
  Warnings:

  - Added the required column `githubResponseId` to the `Check` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Check" ADD COLUMN     "githubResponseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_githubResponseId_fkey" FOREIGN KEY ("githubResponseId") REFERENCES "GithubResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
