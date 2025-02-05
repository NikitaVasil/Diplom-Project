import addTask from "../../database/addTasks"

const newTask =  async (req: any, res: any) => {
  const newTask = req.body //check info in form and parse
  console.log(newTask.newTask)
  const TaskAdd = addTask(newTask.newTask)
  return res.status(200).send({status: "success", msg: `${(await TaskAdd).title} добавлена в БД` });
}

export default newTask;


