import addBoard from "../../database/addBoards";

const newBoard =  async (req: any, res: any) => {
  const activeBoard = req.body //check info in form and parse
  console.log('body = ', activeBoard)
  // console.log('columns', activeBoard.newBoard)
  const boardAdd = addBoard(activeBoard.newBoard)
  return res.status(200).send({status: "success", msg: boardAdd });
}

export default newBoard;