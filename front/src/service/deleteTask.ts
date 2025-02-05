/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function deleteTasks(deleteTask: any) {

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/delete_task',
            data: {deleteTask}
        })
        return response.data
    } catch (err: any) {
        return err.response.data
    }
}