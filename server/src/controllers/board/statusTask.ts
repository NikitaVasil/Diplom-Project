import editStatusTask from "../../database/editStatusTask";

const statusTask =  async (req: any, res: any) => {
  const taskStatus = req.body //check info in form and parse
  const editStatusTasks = editStatusTask(taskStatus.statusTask)
  return res.status(200).send({status: "success", msg: `${(await editStatusTasks).title} обновлена в БД` });
}

export default statusTask;