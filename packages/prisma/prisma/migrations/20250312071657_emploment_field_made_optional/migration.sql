/*
  Warnings:

  - Made the column `firstName` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "firstName" SET NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeInfo" ALTER COLUMN "hireDate" DROP NOT NULL,
ALTER COLUMN "positon" DROP NOT NULL,
ALTER COLUMN "contractType" DROP NOT NULL;
