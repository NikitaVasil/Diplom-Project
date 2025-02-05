import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const deleteBoards = async (formFromRequest: any) => {
    const taskId = formFromRequest
    console.log(taskId)
    await prisma.task.delete({
        where: {
          id: taskId,
        },
        
    })
    
    return taskId
}

export default deleteBoards;