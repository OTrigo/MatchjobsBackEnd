-- DropForeignKey
ALTER TABLE "job" DROP CONSTRAINT "job_companyId_fkey";

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
