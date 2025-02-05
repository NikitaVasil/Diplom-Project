/*
  Warnings:

  - You are about to drop the column `userId` on the `Board` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_userId_fkey";

-- DropIndex
DROP INDEX "Board_userId_idx";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UsersOnBoards" (
    "userId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UsersOnBoards_pkey" PRIMARY KEY ("userId","boardId")
);

-- AddForeignKey
ALTER TABLE "UsersOnBoards" ADD CONSTRAINT "UsersOnBoards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnBoards" ADD CONSTRAINT "UsersOnBoards_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
