-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "companySize" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;
