-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "jobsId" INTEGER;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
