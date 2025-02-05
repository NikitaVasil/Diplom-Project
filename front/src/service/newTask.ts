/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function newTask(newTask: any) {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/new_task',
            data: {newTask}
        })
        return response.data
    } catch (err: any) {
        return err.response.data
    }
}