/*
  Warnings:

  - Added the required column `category` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "category" TEXT NOT NULL;
ALTER TABLE "Job" ADD COLUMN     "type" TEXT NOT NULL;
