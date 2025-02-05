/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function editTasks(editTask: any) {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/edit_task',
            data: {editTask}
        })
        return response.data
    } catch (err: any) {
        return err.response.data
    }
}