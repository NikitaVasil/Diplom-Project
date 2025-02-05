import axios from "axios";
import { LoginUser } from "types/types";

export default async function loginUser(form: LoginUser) {
    const keyStorage = 'userId'
    const nameStorage = 'userName'
    const roleStorage = 'userRole'
    const users = 'objUser'

    try {
        const { email, password } = form
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {email, password}
        })

        if(response.data.status === "success") {
          sessionStorage.setItem(keyStorage, response.data.userId)
          sessionStorage.setItem(nameStorage, response.data.name)
          if(response.data.name === "root" || response.data.role === "admin") {
            sessionStorage.setItem(roleStorage, response.data.role)
            sessionStorage.setItem(users, JSON.stringify(response.data.users))
          }
        }

        return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return err.response.data
    }
}