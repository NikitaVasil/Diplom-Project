import saveRegistration from "../../database/saveRegistration";
import toNewUserEntry from "../../utils/FormVerification/toNewUserEntry";


//block registration
export const registerUser = async (req: any, res: any) => {

    const { name, email, password, role } = req.body
  
    const newUserEntry = toNewUserEntry({ name, email, password, role })
    const result = await saveRegistration(newUserEntry)

    return res.status(200).json({ status: "success", msg: `Пользователь ${result.email} был создан`, id: result.id})
}

