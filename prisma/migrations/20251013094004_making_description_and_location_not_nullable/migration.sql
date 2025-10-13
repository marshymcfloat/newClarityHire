/*
  Warnings:

  - The `companySize` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `description` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('SIZE_1_10', 'SIZE_11_50', 'SIZE_51_200', 'SIZE_201_1000', 'SIZE_1000_PLUS');

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL,
DROP COLUMN "companySize",
ADD COLUMN     "companySize" "CompanySize";
