-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_postsId_fkey";

-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "postsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
