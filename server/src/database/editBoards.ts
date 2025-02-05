import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const editBoards = async (formFromRequest: any) => {
    const updateBoard = formFromRequest
    console.log(updateBoard)
    await prisma.board.update({
      where: {
        id: updateBoard.id,
      },
      data: {
        name: updateBoard.name,
      },
    })

    await updateBoard.columns.map((col : any) => {
      prisma.column.upsert({
        where: {
          id: col.id
        },
        update: {
          name: col.name
        },
        create: {
          id: col.id,
          name: col.name,
          boardId: col.boardId
        }
      })
    })

    
}

export default editBoards;