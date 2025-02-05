import editBoards from "../../database/editBoards";

const editBoard =  async (req: any, res: any) => {
  const edit_Boards = req.body //check info in form and parse
  editBoards(edit_Boards.editBoard)
  return res.status(200).send({status: "success", msg: 'Панель задач отредактирована' });
}

export default editBoard;