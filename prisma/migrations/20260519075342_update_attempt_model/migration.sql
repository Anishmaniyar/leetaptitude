/*
  Warnings:

  - You are about to drop the column `selected` on the `Attempt` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_userId_fkey";

-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "selected",
ADD COLUMN     "numericAnswer" DOUBLE PRECISION,
ADD COLUMN     "selectedOptionId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
