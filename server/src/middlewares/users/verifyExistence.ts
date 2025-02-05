import { PrismaClient } from "@prisma/client"
import { NextFunction } from "express"
import toCheckEmail from "../../utils/FormVerification/toCheckEmail"

const prisma = new PrismaClient()

//middleware verify Exitence User
export const verifyExistence = async (req: any, _res: any, next: NextFunction) =>  {

    const userData = req.body
    let email : string = userData.email

    const emailChecked = toCheckEmail(email) // email parsed to string and lowerdcased

    const result = await prisma.user.findUnique({ where: { email: emailChecked.email } })
    
    if (result) {
      console.error(`Пользователь ${result.email} уже создан`, 404)
      return _res.status(404).json({ msg: `Пользователь ${result.email} уже создан`})
      // throw new UserError(`Адрес электронной почты: ${email} уже существует`, 404)
    }
    
    return next()
}

// export default verifyExistence;