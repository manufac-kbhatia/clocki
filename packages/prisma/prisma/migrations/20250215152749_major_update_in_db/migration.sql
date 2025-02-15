/*
  Warnings:

  - You are about to drop the column `authorizedRepresentativeId` on the `Organisation` table. All the data in the column will be lost.
  - You are about to drop the `AuthorizedRepresentative` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[createdById]` on the table `Organisation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Organisation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Hr', 'Manager', 'Other');

-- DropForeignKey
ALTER TABLE "Organisation" DROP CONSTRAINT "Organisation_authorizedRepresentativeId_fkey";

-- DropIndex
DROP INDEX "Organisation_authorizedRepresentativeId_key";

-- DropIndex
DROP INDEX "Team_teamLeadId_key";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "postalCode" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "dateOfBirth" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Organisation" DROP COLUMN "authorizedRepresentativeId",
ADD COLUMN     "createdById" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AuthorizedRepresentative";

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_createdById_key" ON "Organisation"("createdById");

-- AddForeignKey
ALTER TABLE "Organisation" ADD CONSTRAINT "Organisation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
