/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function deleteBoard(deleteBoard: any) {

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/delete_board',
            data: {deleteBoard}
        })
        return response.data
    } catch (err: any) {
        return err.response.data
    }
}