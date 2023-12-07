import { v4 } from "uuid";
import { hashPassword } from "../Helpers/password-helper.js";
import { CustomError } from "../Models/Interfaces/Errors.js";
import UserCredential from "../Models/user-credential.js";
import User from "../Models/user.js";
import { authRepository, userRepository } from "../Repository/index.js";

async function createUserByEmail(email, password) {
  try {

    const { hash, salt } = hashPassword(password);

    const _id = v4();

    const userCredential = new UserCredential(_id, email, hash, salt);

    //ver la mejor manera para estructurar esto
    // agregar el repositorio, storage y creacion del usuario en la colleccion del usuario
    const user = new User(_id, "", "", undefined, email, undefined, undefined, "credential");

    await authRepository.createUserByEmail(userCredential);

    await userRepository.createUserByEmail(user)

    return

  } catch (error) {

    return new CustomError(
      "There was a problem creating the user.",
      500,
      error.message
    );
  }
}

async function getUsersCredential(email) {
  try {
    const user = await authRepository.getUserByEmail(email)

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

    return {
      err: new CustomError(
        "There was a problem fetching the user",
        500,
        err.message,
      )
    }
  }
}

export { createUserByEmail, getUsersCredential };
