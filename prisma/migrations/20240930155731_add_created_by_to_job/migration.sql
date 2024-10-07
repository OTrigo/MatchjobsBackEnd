/*
  Warnings:

  - Added the required column `createdBy` to the `job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job" ADD COLUMN     "createdBy" VARCHAR(30) NOT NULL;
