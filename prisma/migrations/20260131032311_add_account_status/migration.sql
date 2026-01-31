-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE';
