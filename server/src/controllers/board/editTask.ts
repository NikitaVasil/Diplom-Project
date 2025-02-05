import editTasks from "../../database/editTasks";

const editTask =  async (req: any, res: any) => {
  const editTask = req.body //check info in form and parse
  console.log(editTask.editTask)
  const taskEdit = editTasks(editTask.editTask)
  return res.status(200).send({status: "success", msg: `${(await taskEdit).title} обновлена в БД` });
}

export default editTask;

