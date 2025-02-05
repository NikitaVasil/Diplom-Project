import { Router } from 'express'
import completedSubtask from '../controllers/board/completedSubtask'
import deleteBoard from '../controllers/board/deleteBoard'
import deleteTask from '../controllers/board/deleteTask'
import editBoard from '../controllers/board/editBoard'
import editTask from '../controllers/board/editTask'
import newBoard from '../controllers/board/newBoard'
import newTask from '../controllers/board/newTask'
import statusTask from '../controllers/board/statusTask'
import { loginUser } from '../controllers/users/index'
import { registerUser } from '../controllers/users/register_user'
import getBoards from '../database/getBoards'
import getAllEmployess from '../database/getEmployees'
import { verifyExistence } from '../middlewares/users/verifyExistence'
import verifyLogin from '../middlewares/users/verifyLogin'
import verifyToken from '../middlewares/users/verifyToken'
import verifyTokenEmployees from '../middlewares/users/verifyTokenEmployees'


const routerUsers = Router()

routerUsers.post("/new_user", verifyExistence ,registerUser)

routerUsers.post("/login", verifyLogin, loginUser)

routerUsers.post("/new_board", newBoard)

routerUsers.post("/edit_board", editBoard)

routerUsers.post("/delete_board", deleteBoard)

routerUsers.post("/new_task", newTask)

routerUsers.post("/edit_task", editTask)

routerUsers.post("/delete_task", deleteTask)

routerUsers.post("/status_task", statusTask)

routerUsers.post("/completed_subtask", completedSubtask)

routerUsers.get('/', verifyToken, getBoards)

routerUsers.get('/get_employees', verifyTokenEmployees, getAllEmployess)

export default routerUsers;