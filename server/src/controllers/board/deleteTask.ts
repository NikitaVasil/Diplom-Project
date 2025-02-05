import deleteTasks from "../../database/deleteTasks";


const deleteTask =  async (req: any, res: any) => {
  const deleteTaskId = req.body //check info in form and parse
  console.log(deleteTaskId)
  const delTask = deleteTasks(deleteTaskId.deleteTask)
  return res.status(200).send({status: "success", msg: `Панель задач c id: ${delTask} удалена` });
}

export default deleteTask;