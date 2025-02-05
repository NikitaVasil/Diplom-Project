import { prisma } from "../utils/db";

const getAllBoardsData = async (req: any, res: any) => {
    const token = req.token

    // find User
    var user = await prisma.user.findUnique({where: {email: token.email}})
    let boards: any

    if(user.role != 'admin') {
      boards = await prisma.board.findMany({
        where: {
          users: {
            some: {
              userId: user.id
            }
          }
        },
        include: {
          columns: {
            include: {
              tasks: {
                where:{
                  userId: user.id
                },
                include: {
                  subtasks: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        }
      });
    } else {
      boards = await prisma.board.findMany({
        where: {
          users: {
            some: {
              userId: user.id
            }
          }
        },
        include: {
          columns: {
            include: {
              tasks: {
                include: {
                  subtasks: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        }
      });
    }
    
    // return boards
    return res.status(200)
        .send({ status: "success", boards: boards })
};

export default getAllBoardsData