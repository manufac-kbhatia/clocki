-- DropForeignKey
ALTER TABLE "EmployeeInfo" DROP CONSTRAINT "EmployeeInfo_employeeId_fkey";

-- AddForeignKey
ALTER TABLE "EmployeeInfo" ADD CONSTRAINT "EmployeeInfo_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
