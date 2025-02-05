/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function setStatusTask(statusTask: any) {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/status_task',
            data: {statusTask}
        })
        return response.data
    } catch (err: any) {
        return err.response.data
    }
}