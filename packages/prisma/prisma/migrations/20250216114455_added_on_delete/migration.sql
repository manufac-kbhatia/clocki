-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_organisationId_fkey";

-- DropForeignKey
ALTER TABLE "Organisation" DROP CONSTRAINT "Organisation_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_teamLeadId_fkey";

-- DropIndex
DROP INDEX "Employee_organisationId_key";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "organisationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organisation" ADD CONSTRAINT "Organisation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
