-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('Free', 'Paid');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "subscription" "Subscription" NOT NULL DEFAULT 'Free';
