/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function editBoard(editBoard: any) {
    try {
      console.log(editBoard)
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/edit_board',
            data: {editBoard}
        })
        return response.data
    } catch (err: any) {
        return err.response.data
    }
}