/*
  Warnings:

  - A unique constraint covering the columns `[userId,year,month]` on the table `Usage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `month` to the `Usage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usage" ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usage_userId_year_month_key" ON "Usage"("userId", "year", "month");
