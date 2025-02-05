import axios from "axios"
import { NewUser } from "types/types"

export default async function registerUser(form: NewUser) {
    try {
        const { name, email, password, role } = form
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/new_user',
            data: {name, email, password, role}
        })
        return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.log(err.response.data)
        return err.response.data
    }
}