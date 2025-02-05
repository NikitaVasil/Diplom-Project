import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const editTasks = async (formFromRequest: any) => {
    const updateTask = formFromRequest
    console.log('DB= ',updateTask)
    const task = await prisma.task.update({
      where: {
        id: updateTask.id
      }, data : {
        title: updateTask.title,
        description: updateTask.description,
        status: updateTask.status,
        columnId: updateTask.columnId,
        userId: updateTask.userId,
      }
    })

    await updateTask.subtasks.map((subtask : any) => {
      prisma.subtask.upsert({
        where: {
          id: subtask.id,
        },
        update: {
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        },
        create: {
          id: subtask.id,
          title: subtask.title,
          isCompleted: subtask.isCompleted,
          taskId: subtask.taskId,
        }
      })
    })

    return task
}

export default editTasks;