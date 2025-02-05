import { AuthUser } from "../../types/types";
import { parseToString } from "../users";

const toParseCredentials = ({ email, password }: AuthUser) => {
    const auth: AuthUser = {
        email: parseToString(email).toLowerCase(),
        password: parseToString(password)
    }
    return auth
}

export default toParseCredentials;