import { PrismaClient } from "@prisma/client"
import { TaskState } from "../types/types"

const prisma = new PrismaClient()

const addTask = async (formFromRequest: TaskState) => {


  const dataTask = formFromRequest
  console.log('dataTask =',dataTask)

  const task = await prisma.task.create({
      data:
      {
        id: dataTask.id,
        title: dataTask.title,
        description: dataTask.description,
        status: dataTask.status,
        columnId: dataTask.columnId,
        userId: dataTask.userId,
      }
  })

  await prisma.subtask.createMany({
    data: dataTask.subtasks
  })

  console.log('Задача добавлена в БД')
  return task
}

export default addTask;