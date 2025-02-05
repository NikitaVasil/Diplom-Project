import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const deleteBoards = async (formFromRequest: any) => {
    const boardId = formFromRequest
    console.log(boardId)
    await prisma.board.delete({
        where: {
          id: boardId,
        },
        
    })
    console.log('Панель задач удалена из БД')
}

export default deleteBoards;