/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";


export default async function getEmployees (token: string) {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3000/get_employees',
            headers: { employees: `bearer${token}` }
        })
        return response.data.employess
    } catch (err: any) {
        return err.response.data
    }
}