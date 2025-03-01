/*
  Warnings:

  - You are about to drop the column `lastname` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "lastname",
ADD COLUMN     "lastName" TEXT;
