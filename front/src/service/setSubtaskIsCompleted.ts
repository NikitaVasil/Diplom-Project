/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function setSubtaskIsComplete(subtaskIsCompleted: any) {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/completed_subtask',
            data: {subtaskIsCompleted}
        })
        return response.data
    } catch (err: any) {
        return err.response.data
    }
}