/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'NonBinary', 'Other', 'PreferNotToSay');

-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('Permanent', 'Intern', 'Contract', 'Other');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "AuthorizedRepresentative" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "AuthorizedRepresentative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organisation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "vatNumber" TEXT NOT NULL,
    "authorizedRepresentativeId" INTEGER NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastname" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "organisationId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeInfo" (
    "id" SERIAL NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "positon" TEXT NOT NULL,
    "contractType" "ContractType" NOT NULL,
    "vacationDays" INTEGER NOT NULL DEFAULT 0,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "EmployeeInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "teamLeadId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EmployeeTeams" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EmployeeTeams_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_vatNumber_key" ON "Organisation"("vatNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_authorizedRepresentativeId_key" ON "Organisation"("authorizedRepresentativeId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_organisationId_key" ON "Employee"("organisationId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeInfo_employeeId_key" ON "EmployeeInfo"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamLeadId_key" ON "Team"("teamLeadId");

-- CreateIndex
CREATE INDEX "_EmployeeTeams_B_index" ON "_EmployeeTeams"("B");

-- AddForeignKey
ALTER TABLE "Organisation" ADD CONSTRAINT "Organisation_authorizedRepresentativeId_fkey" FOREIGN KEY ("authorizedRepresentativeId") REFERENCES "AuthorizedRepresentative"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeInfo" ADD CONSTRAINT "EmployeeInfo_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamLeadId_fkey" FOREIGN KEY ("teamLeadId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeTeams" ADD CONSTRAINT "_EmployeeTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeTeams" ADD CONSTRAINT "_EmployeeTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
