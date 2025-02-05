/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";


export default async function getBoards (token: string) {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3000/',
            headers: { authorization: `bearer${token}` }
        })
        // console.log('boards = ', response.data.boards)
        return response.data.boards
    } catch (err: any) {
        return err.response.data
    }
}


// (err:any) => {
//   if (err) {
//     console.error('Error writing to file:', err);
//     return;
//   }
//   console.log('Данные JSON были успешно записаны в файл');
// }