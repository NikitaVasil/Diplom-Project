import { NextFunction, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { TokenError } from "../../utils/Errors";

//middleware de extraction de token
const verifyToken = (req: any, _res: Response, next: NextFunction) => {
    const authorization = req.get('authorization');
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    } else { throw new TokenError('Недействительная авторизация', 401) }

    //получаем email из токена
    const decodedToken = jwtDecode(token)

    if (!token || !decodedToken) { throw new TokenError('Полученный токен отсутствует или недействителен', 401) }

    req.token = decodedToken

    return next()
}

export default verifyToken;