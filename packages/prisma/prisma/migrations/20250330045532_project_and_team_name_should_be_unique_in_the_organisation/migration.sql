/*
  Warnings:

  - A unique constraint covering the columns `[name,organisationId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,organisationId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_name_organisationId_key" ON "Project"("name", "organisationId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_organisationId_key" ON "Team"("name", "organisationId");
