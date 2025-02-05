import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { NewUser, User } from "../types/types.d"

const prisma = new PrismaClient()

const saveRegistration = async (formFromRequest: NewUser): Promise<User> => {
    let password : string
    password = formFromRequest.password
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)

    const user = await prisma.user.create({
        data:
        {
            name: formFromRequest.name,
            email: formFromRequest.email,
            password: hash,
            role: formFromRequest.role,
        }
    })

    const newUser = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    })
    
    return newUser
}

export default saveRegistration;