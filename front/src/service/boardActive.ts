/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function activeBoard(activeBoard: any) {

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/active_board',
            data: {activeBoard}
        })
        return response.data
    } catch (err: any) {
        return err.response.data
    }
}