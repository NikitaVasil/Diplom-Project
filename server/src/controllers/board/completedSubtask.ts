import editCompletedSubtask from "../../database/editCompletedSubtask";

const completedSubtask =  async (req: any, res: any) => {
  const subtaskIsComp = req.body //check info in form and parse
  const editCompSubtask = editCompletedSubtask(subtaskIsComp.subtaskIsCompleted)
  return res.status(200).send({status: "success", msg: `${(await editCompSubtask).title} обновлена в БД` });
}

export default completedSubtask;