/*
  Warnings:

  - A unique constraint covering the columns `[postsId]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "jobsId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "jobs_postsId_key" ON "jobs"("postsId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
