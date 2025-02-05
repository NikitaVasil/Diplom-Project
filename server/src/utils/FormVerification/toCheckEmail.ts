import { EmailUser } from "../../types/types";
import { parseToString } from "../users";

const toCheckEmail = (formEmail: string): EmailUser => {
    console.log(formEmail)
    const emailParsed: EmailUser = {
        email: parseToString(formEmail).toLocaleLowerCase()
    }
    return emailParsed
}

export default toCheckEmail;