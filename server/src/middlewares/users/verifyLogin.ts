import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { NextFunction } from "express"
import toParseCredentials from "../../utils/FormVerification/toParseCredentials"
const prisma = new PrismaClient()

//middleware verify Login User
const verifyLogin =  async (req: any, _res: any, next: NextFunction) => {
    
    const loginForm = toParseCredentials(req.body) //check info in form and parse

    const user = await prisma.user.findUnique({ where: { email: loginForm.email } })

    const encryptedPassword = user === null ? false : await bcrypt.compare(loginForm.password, user.password)
    console.log('status = ',!(encryptedPassword))

    if (!(user)) {
      console.error(`Пользователя не существует`, 404)
      return _res.status(404).send({ status: `ErrorUser`})
    } else if (!(encryptedPassword)) {
      console.error(`Не правильный пароль`, 404)
      return _res.status(404).send({ status: `ErrorPass`})
    } else {
      //записываем в массив id и name Пользователя
    let allUser: any = []
    if(user.role === "admin") {
      const filter = await prisma.user.findMany()
      filter.map((user: any) => {
        if(user.role != "admin"){
          const id = user.id
          const name = user.name
          const dataUser = {id, name}
          allUser.push(dataUser)
        }
      })
    }

    const masUser = [user, allUser]

    req.body = masUser

    }
    
    return next()
}

export default verifyLogin;