import { prisma } from "../utils/db";

const getAllEmployess = async (req: any, res: any) => {
    const token = req.token

    // find User
    var user = await prisma.user.findUnique({where: {email: token.email}})
    let employess: any

    if(user.name === "root") {
      employess = await prisma.user.findMany({
        where: {
          name: {not: "root"}
        }
      })
    }
    let employeesArray: any = []
    employess.map((employee : any) => {
      const name = employee.name
      const email = employee.email
      const role = employee.role
      const active = employee.active
      const emploeesObject = {name, email, role, active}
      employeesArray.push(emploeesObject)
    })

    // return employeesArray
    return res.status(200)
        .send({ status: "success", employess: employeesArray })
};

export default getAllEmployess