import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const editStatusTask = async (formFromRequest: any) => {
    const updateTask = formFromRequest
    const task = await prisma.task.update({
      where: {
        id: updateTask.taskId
      }, data : {
        status: updateTask.taskStatus,
        columnId: updateTask.taskColumnId,
      }
    })

    return task
}

export default editStatusTask;