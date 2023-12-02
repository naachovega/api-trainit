import { v4 } from "uuid";
import { hashPassword } from "../Helpers/password-helper.js";
import { CustomError } from "../Models/Interfaces/Errors.js";
import UserCredential from "../Models/user-credential.js";
import User from "../Models/user.js";
import { authRepository } from "../Repository/index.js";

async function createUserByEmail(email, password) {
  try {

    const { hash, salt } = hashPassword(password);

    const _id = v4();

    const userCredential = new UserCredential(_id, email, hash, salt);

    //ver la mejor manera para estructurar esto
    // agregar el repositorio, storage y creacion del usuario en la colleccion del usuario
    const userCreated = new User(_id, "", "", undefined, email, undefined, undefined, "credential");

    await authRepository.createUserByEmail(userCredential);

    return null

  } catch (error) {
    console.log(error);
    return new CustomError(
      "There was a problem creating the user.",
      500,
      error.message
    );
  }
}

export { createUserByEmail };
