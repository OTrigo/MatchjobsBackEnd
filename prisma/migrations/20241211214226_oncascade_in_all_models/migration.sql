-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_companyId_fkey";

-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "application" DROP CONSTRAINT "application_userId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_analyticsId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_jobId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_userId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_companyId_fkey";

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "analytic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
