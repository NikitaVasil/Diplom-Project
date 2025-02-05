import { Enviroments } from "types/types"

export const getEnviroments = (): Enviroments => {
    return {
        PW_SESSION: 'tokenKey' as string,
        PORT: Number(5173)
    }
}
