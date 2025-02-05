import { PrismaClient } from "@prisma/client"
// import { BoardState } from "../types/types"

const prisma = new PrismaClient()

const addBoard = async (formFromRequest: any) => {

    const dataBoard = formFromRequest

    const users = await prisma.user.findMany()

    //записываем в массив id Пользователя
    let allUser: any = []
    users.map((us: any) => {
        const userId = us.id
        const usId = {userId}
        allUser.push(usId)
    })

    console.log(allUser)

    const board = await prisma.board.create({
      data: {
        id: dataBoard.id,
        name: dataBoard.name,
        users: {
          create: allUser
        }
      }
    })

    await prisma.column.createMany({
        data: dataBoard.columns
    })

    return board;
}

export default addBoard;