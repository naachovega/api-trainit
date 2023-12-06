import { CustomError } from "../Models/Interfaces/Errors.js"
import { userRepository } from "../Repository/index.js"

async function getUserByEmail(email) {

    try {
        const user = await userRepository.getUserByEmail(email)

        if (user.length > 0) {
            return {
                user: user,
                err: new CustomError(
                    "The user already exists",
                    409,
                    "The user already exists",
                )
            }
        }
        return { user: user }
    } catch (err) {
        console.log(err)
        return {
            err: new CustomError(
                "There was a problem fetching the user",
                500,
                err.message,
            )
        }
    }

}

export { getUserByEmail }