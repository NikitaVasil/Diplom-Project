import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const editCompletedSubtask = async (formFromRequest: any) => {
    const updateSubtask = formFromRequest
    const task = await prisma.subtask.update({
      where: {
        id: updateSubtask.subtaskId
      }, data : {
        isCompleted: updateSubtask.subtaskIsCompleted,
      }
    })

    return task
}

export default editCompletedSubtask;