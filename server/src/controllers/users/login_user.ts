import jwt from "jsonwebtoken";
// import getAllBoardsData from "../../database/getBoards";
import { getEnviroments } from "../../prisma/enviroments";

const loginUser = async (req: any, res: any) => {
  try{
    const user = req.body[0]
    console.log('user=', user)
    const dataUsers = () => {
      if(user.role === "admin") {
        return true
      }
    }
    

    const userForToken = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active
    }

    //token
    const token = jwt.sign(userForToken, `${getEnviroments().SECRET_WORD}`, { expiresIn: 60 * 60 })

    return res.status(200)
        .send({ status: "success", userId: user.id, token: token, role: user.role, name: user.name, users: dataUsers ? req.body[1] : null})
    }
    catch(error){
      console.error(error)
      return res.status(401).send({status: "error"})
  }
}

export default loginUser;

// board: boards