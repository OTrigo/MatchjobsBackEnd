/*
  Warnings:

  - You are about to drop the column `Role` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "Role",
ADD COLUMN     "role" VARCHAR(30) NOT NULL DEFAULT 'User';
