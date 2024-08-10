/*
  Warnings:

  - You are about to drop the column `url` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "url",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
