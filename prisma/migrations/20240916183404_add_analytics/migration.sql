/*
  Warnings:

  - Added the required column `analyticsId` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "analyticsId" VARCHAR(30) NOT NULL;

-- CreateTable
CREATE TABLE "analytic" (
    "id" VARCHAR(30) NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "commentsAmount" INTEGER NOT NULL DEFAULT 0,
    "shares" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "postId" VARCHAR(30) NOT NULL,

    CONSTRAINT "analytic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "analytic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
