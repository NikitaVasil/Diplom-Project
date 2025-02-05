import { NextFunction, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { TokenError } from "../../utils/Errors";

//middleware de extraction de token
const verifyTokenEmployees = (req: any, _res: Response, next: NextFunction) => {
    const authorization = req.get('employees');
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    } else { throw new TokenError('Недействительная авторизация', 401) }

    //получаем email из токена
    const decodedToken = jwtDecode(token)

    if (!token || !decodedToken) { throw new TokenError('Полученный токен отсутствует или недействителен', 401) }

    req.token = decodedToken

    console.log(req.token)

    return next()
}

export default verifyTokenEmployees;