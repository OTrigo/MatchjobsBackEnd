-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_analyticsId_fkey";

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "analyticsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "analytic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
