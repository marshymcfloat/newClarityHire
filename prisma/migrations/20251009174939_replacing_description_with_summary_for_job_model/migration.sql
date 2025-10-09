/*
  Warnings:

  - You are about to drop the column `description` on the `Job` table. All the data in the column will be lost.
  - Added the required column `summary` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Made the column `department` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "description",
ADD COLUMN     "summary" TEXT NOT NULL,
ALTER COLUMN "department" SET NOT NULL;
