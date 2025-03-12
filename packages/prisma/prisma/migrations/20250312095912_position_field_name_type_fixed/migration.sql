/*
  Warnings:

  - You are about to drop the column `positon` on the `EmployeeInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmployeeInfo" DROP COLUMN "positon",
ADD COLUMN     "position" TEXT;
