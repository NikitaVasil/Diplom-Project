-- DropForeignKey
ALTER TABLE "UsersOnBoards" DROP CONSTRAINT "UsersOnBoards_boardId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnBoards" DROP CONSTRAINT "UsersOnBoards_userId_fkey";

-- AddForeignKey
ALTER TABLE "UsersOnBoards" ADD CONSTRAINT "UsersOnBoards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnBoards" ADD CONSTRAINT "UsersOnBoards_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
