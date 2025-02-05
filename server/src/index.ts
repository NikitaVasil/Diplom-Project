import { getEnviroments } from "./prisma/enviroments"
import { server } from "./server"

const enviroments = getEnviroments()

server.listen(enviroments.PORT, () => {
    console.log(`Север БД запущен на порту: ${enviroments.PORT}`)
})