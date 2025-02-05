import deleteBoards from "../../database/deleteBoards";


const deleteBoard =  async (req: any, res: any) => {
  const deleteBoardId = req.body //check info in form and parse
  deleteBoards(deleteBoardId.deleteBoard)
  return res.status(200).send({status: "success", msg: 'Панель задач удалена' });
}

export default deleteBoard;