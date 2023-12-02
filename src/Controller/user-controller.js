import { userRepository } from "../Repository"

async function getUserByEmail(email) {

    try {
        const user = await userRepository.getUserByEmail(email)

        if (user) {
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