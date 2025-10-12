/*
  Warnings:

  - You are about to drop the column `isActive` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TeamRole" AS ENUM ('ADMIN', 'RECRUITER', 'HIRING_MANAGER', 'MEMBER');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'free',
ADD COLUMN     "stripeCustomerId" TEXT;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "isActive",
ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyId",
DROP COLUMN "password",
DROP COLUMN "role",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "hashedPassword" TEXT;

-- DropEnum
DROP TYPE "public"."UserRoleEnum";

-- CreateTable
CREATE TABLE "CompanyMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "role" "TeamRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMember_userId_companyId_key" ON "CompanyMember"("userId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_ownerId_key" ON "Company"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_stripeCustomerId_key" ON "Company"("stripeCustomerId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMember" ADD CONSTRAINT "CompanyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMember" ADD CONSTRAINT "CompanyMember_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
