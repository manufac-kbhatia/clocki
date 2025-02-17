-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_organisationId_fkey";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
