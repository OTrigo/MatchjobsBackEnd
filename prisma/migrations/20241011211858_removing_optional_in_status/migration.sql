/*
  Warnings:

  - Made the column `status` on table `application` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "application" ALTER COLUMN "status" SET NOT NULL;
