import { v4 } from "uuid";
import { hashPassword } from "../Helpers/password-helper.js";
import { CreatingError } from "../Models/Interfaces/Errors.js";
import UserCredential from "../Models/user-credential.js";
import User from "../Models/user.js";
import { authRepository } from "../Repository/index.js";

async function createUserByEmail(email, password) {
  try {
    const { hash, salt } = hashPassword(password);
    console.log(hash, salt);

    const _id = v4();

    const userCredential = new UserCredential(_id, email, hash, salt);
    await authRepository.createUserByEmail(userCredential);

    const user = new User();

    // agregar el repositorio, storage y creacion del usuario en la colleccion del usuario
  } catch (error) {
    console.log(error);
    return new CreatingError(
      "There was a problem creating the user.",
      500,
      error.message
    );
  }
}

export { createUserByEmail };
