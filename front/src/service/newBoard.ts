/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function newBoard(newBoard: any) {

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/new_board',
            data: {newBoard}
        })
        return response.data
    } catch (err: any) {
        return err.response.data
    }
}