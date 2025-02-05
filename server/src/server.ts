import cors from "cors"
import express, { NextFunction } from 'express'
import router from './routes/routes'
export const server = express()
server.use(express.json())
server.use(cors())

//routes
server.use('/', router)


server.use((err: any, _req: any, res: any, _next: NextFunction) => {
    //Error - user
    if (err.name === "userError") {
        return res.status(err.code).send({
            error: true,
            errorName: err.name,
            message: err.message
        })
    }

    return res.status(err.code || 500).send({
        error: true,
        errorName: err.name,
        message: err.message,
    });
});